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

	width : 1000,
	initComponent : function() {
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
				title : '自动推送历史',
				flex : 1,
				store : this.createAutoHistoryStore(),
				columns : [{
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
					width : 300
				}, {
					text : "客户端",
					dataIndex : 'clientType',
					width : 100
				}, {
					text : "用户群",
					dataIndex : 'userScope',
					width : 100
				}, {
					text : "推送状态",
					dataIndex : 'sendState',
					width : 100
				}],
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
		grid.setTitle('MapReduce');
		grid.reconfigure(this.createAutoHistoryStore(), [{
			flex : 1,
			text : 'MR名称',
			dataIndex : 'statisicJobName'
		}, {
			text : '更新时间',
			dataIndex : 'lastUpdateTime',
			width : 140
		}]);
		this.down('#autoHistory').disable();
		this.down('#autoConfig').enable();
		Ext.resumeLayouts(true);
	},

	onAutoConfigClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('Tag');
		grid.reconfigure(this.createTagLogStore(), [{
			text : '名称',
			width : 250,
			dataIndex : 'name'
		}, {
			text : '开始时间',
			width : 250,
			dataIndex : 'start'
		}, {
			text : '线程数',
			dataIndex : 'threadNum'
		}, {
			flex : 1,
			text : '状态',
			dataIndex : 'state'
		}, {
			flex : 1,
			text : '大小',
			dataIndex : 'size'
		}]);
		this.down('#autoConfig').disable();
		this.down('#autoHistory').enable();
		Ext.resumeLayouts(true);
	},

	createAutoHistoryStore : function() {
		return new Ext.data.Store({
			fields : ['id', 'statisicJobName', 'lastUpdateTime'],
			autoLoad : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				},
				url : Push.util.Global.ROOT_URL + '/web/manual/joblog/lastMapReduceTime'
			}
		});
	},

	createTagLogStore : function() {
		return new Ext.data.Store({
			fields : ['id', 'name', 'start', 'threadNum', 'state', 'size'],
			autoLoad : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				},
				url : Push.util.Global.ROOT_URL + '/web/manual/joblog/autoConfig'
			}
		});
	},
});
