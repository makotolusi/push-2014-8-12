/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('Push.view.push.AutoPushList', {
	extend : 'Ext.container.Container',

	requires : ['Ext.grid.*', 'Ext.layout.container.HBox', 'Ext.layout.container.VBox', 'Push.util.Global'],
	xtype : 'autopush-grid',

	//<example>
	exampleTitle : '自动推送',
	//</example>

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	width : 1300,
	initComponent : function() {
		var me = this;
		var store = this.createAutoHistoryStore();
		me.pageBar = Ext.create('Ext.PagingToolbar', {
			store : store,
			items : ['-']
		});
		me.pageBar.bindStore(store);
		me.pageBar.doRefresh();
		Ext.apply(this, {
			items : [{
				xtype : 'container',
				layout : 'hbox',
				defaultType : 'button',
				items : [{
					itemId : 'autoHistory',
					text : '自动推送历史',
					scope : this,
					handler : this.onShowAutoHistoryClick
				}, {
					itemId : 'autoConfig',
					margin : '0 0 0 10',
					text : '自动推送配置',
					scope : this,
					handler : this.onAutoConfigClick
				}]
			}, {
				margin : '10 0 0 0',
				xtype : 'grid',
				id : 'autopush-list',
				title : '自动推送历史',
				flex : 1,
				store : store,
				bbar : me.pageBar,
				columns : this.getAutoHistoryCol(),
				viewConfig : {
					emptyText : 'Click a button to show a dataset',
					deferEmptyText : false
				}
			}]
		});
		this.callParent();
	},

	onShowAutoHistoryClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('自动推送历史');
		grid.reconfigure(this.createAutoHistoryStore(), this.getAutoHistoryCol());
		this.down('#autoHistory').disable();
		this.down('#autoConfig').enable();
		Ext.resumeLayouts(true);
	},

	onAutoConfigClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('自动推送历史');
		grid.reconfigure(this.createAutoConfigStore(), this.getAutoConfigCol());
		this.down('#autoConfig').disable();
		this.down('#autoHistory').enable();
		Ext.resumeLayouts(true);
	},

	getAutoHistoryCol : function() {
		return [{
			text : "推送时间",
			dataIndex : 'sendDate',
			width : 150
		}, {
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
					return value.name;
			},
			width : 100
		}, {
			text : "客户端",
			dataIndex : 'clientType',
			width : 100
		}, {
			text : "用户群",
			dataIndex : 'userScope',
			width : 100
		}, {
			text : "标签",
			dataIndex : 'tags',
			renderer : function(value) {
				var dd = '';
				Ext.Array.each(value, function(name, index, countriesItSelf) {
					dd += name.tagName + ",";
				});
				return dd;
			},
			width : 250
		}, {
			text : "推送状态",
			dataIndex : 'sendState',
			width : 100
		}];
	},

	getAutoConfigCol : function() {
		var me = this;
		this.disable = {
			// iconCls : 'action_stop',
			id : 'autopush-disable',
			getClass : function(v, meta, record) {
				if (record.get('jobState') == 'ENABLE') {
					this.items[1].tooltip = '停用';
					return 'action_stop';
				} else {
					return 'action_go';
				}
			},
			handler : function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var str = '';
				if (rec.get('jobState') == 'ENABLE') {
					str = "确认停用吗?";
				} else {
					str = "确认启用吗?";
				}
				Ext.MessageBox.confirm('确认', str, function(btn, text) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : Push.util.Global.ROOT_URL + '/web/push/autoPushStatus',
							method : 'POST',
							params : {
								id : rec.get('id'),
								status : rec.get('jobState') == 'ENABLE'?'DISABLE':'ENABLE',
							},
							success : function(response) {
								var text = response.responseText;
								grid.getStore().reload();
							},
							failure : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '失败-' + text, function() {
								}, this);
							}
						});
					}
				}, this);
			}
		};
		return [{
			text : "推送时间",
			dataIndex : 'sendDate',
			width : 150
		}, {
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
					return value.name;
			},
			width : 100
		}, {
			text : "客户端",
			dataIndex : 'clientType',
			width : 100
		}, {
			text : "用户群",
			dataIndex : 'userScope',
			width : 100
		}, {
			text : "标签",
			dataIndex : 'tags',
			renderer : function(value) {
				var dd = '';
				Ext.Array.each(value, function(name, index, countriesItSelf) {
					dd += name.tagName + ",";
				});
				return dd;
			},
			width : 240
		}, {
			menuDisabled : true,
			text : "操作",
			sortable : false,
			xtype : 'actioncolumn',
			width : 110,
			items : [{
				iconCls : 'grid-edit',
				tooltip : '编辑',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					console.log(rec.get('tags'));
					var win = Ext.create('Push.view.push.PushForm', {
						url : '/web/push/updateAutoConfig',
						ctId : rec.get('id'),
						ctTitle : rec.get('title'),
						ctContent : rec.get('content'),
						ctClientType : rec.get('clientType'),
						userScope : rec.get('userScope'),
						keyValue : rec.get('keyValue'),
						interval : rec.get('interval'),
						contentType : rec.get('contentType'),
						tags : rec.get('tags'),
						pushType : me.pushType
					});
					win.setPosition(600, 50);
					win.show();
				}
			}, me.disable]
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
					pushType : 'AUTO_HISTORY'
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
