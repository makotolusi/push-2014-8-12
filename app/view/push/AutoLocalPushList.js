/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('Push.view.push.AutoLocalPushList', {
	extend : 'Ext.container.Container',

	requires : ['Ext.grid.*', 'Ext.layout.container.HBox', 'Ext.layout.container.VBox', 'Push.util.Global'],
	xtype : 'autolocalpush-grid',

	//<example>
	exampleTitle : '本地定时推送',
	//</example>

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	width : 900,
	initComponent : function() {
		var me = this;
		var store = this.createAutoHistoryStore();
		// me.pageBar.bindStore(store);
		// me.pageBar.doRefresh();
		Ext.apply(this, {
			items : [{
				xtype : 'container',
				layout : 'hbox',
				defaultType : 'button',
				items : [{
					itemId : 'autoLocalConfig',
					margin : '0 0 0 10',
					text : '本地定时推送配置',
					scope : this
				}]
			}, {
				margin : '10 0 0 0',
				xtype : 'grid',
				id : 'autolocalpush-list',
				title : '本地定时',
				flex : 1,
				store : store,
				columns : this.getAutoConfigCol(),
				viewConfig : {
					emptyText : 'Click a button to show a dataset',
					deferEmptyText : false
				}
			}]
		});
		this.callParent();
	},

	
	getAutoConfigCol : function() {
		var me = this;
		return [{
			text : "标题",
			dataIndex : 'title',
			width : 250,
			sortable : false
		}, {
			text : "内容",
			dataIndex : 'content',
			width : 250
		}, {
			text : "内容类型",
			dataIndex : 'contentType',
			renderer : function(value) {
				if (value == null)
					return '无';
				else
					return value.desc;
			},
			width : 100
		},{
			text : "次数",
			dataIndex : 'keyValue',
			renderer : function(value) {
				if (value == null)
					return '无';
				else
					return value.time;
			},
			width : 150
		},{
			menuDisabled : true,
			text : "操作",
			sortable : false,
			xtype : 'actioncolumn',
			width : 100,
			items : [{
				iconCls : 'grid-edit',
				tooltip : '编辑',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					console.log(rec.get('tags'));
					var win = Ext.create('Push.view.push.AutoLocalForm', {
						url : '/web/push/updateAutoConfig',
						ctId : rec.get('id'),
						ctTitle : rec.get('title'),
						ctContent : rec.get('content'),
						time:rec.get('keyValue').time,
						pushType : me.pushType
					});
					win.setPosition(600, 50);
					win.show();
				}
			}]
		}];
	},
	createAutoHistoryStore : function() {
		var store = Ext.create('Push.store.Pushs', {
			proxy : {
				type : 'ajax',
				url : Push.util.Global.ROOT_URL + '/web/push/listAutoPush',
				paramsAsJson : true,
				actionMethods : {
					read : "POST"
				},
				extraParams : {
					pushType : 'AUTO_LOCAL'
				},
				headers : {
					'Content-Type' : 'application/json; charset=utf-8',
					'Accept' : 'application/json'
				},
				reader : {
					type : 'json',
					rootProperty : 'page.content',
					totalProperty : 'page.rowCount'
				},
				writer : {
					type : 'json'
				}
			}
		});
		store.load();
		return store;
	},

	createAutoConfigStore : function() {
		var store = Ext.create('Push.store.Pushs', {
			proxy : {
				type : 'ajax',
				url : Push.util.Global.ROOT_URL + '/web/push/listAutoPush',
				paramsAsJson : true,
				actionMethods : {
					read : "POST"
				},
				extraParams : {
					pushType : 'AUTO'
				},
				headers : {
					'Content-Type' : 'application/json; charset=utf-8',
					'Accept' : 'application/json'
				},
				reader : {
					type : 'json',
					rootProperty : 'page.content',
					totalProperty : 'page.rowCount'
				},
				writer : {
					type : 'json'
				}
			}
		});
		store.load();
		this.pageBar = Ext.create('Ext.PagingToolbar', {
			store : store,
			items : ['-']
		});
		this.pageBar.bindStore(store);
		this.pageBar.doRefresh();
		return store;
	},
});
