/**
 * Demonstrates a default configuration of a tab panel.
 */
Ext.define('Push.view.push.PushListTabs', {
	extend : 'Ext.tab.Panel',
	xtype : 'push-list-tabs',
	controller : 'push-list-tab-view',
	id : 'push-grid-tabs',
	//<example>
	requires : ['Push.view.push.PushListTabController'],
	otherContent : [{
		type : 'ViewController',
		path : 'app/view/push/TabController.js'
	}],
	width : 1400,
	height : 700,
	initComponent : function() {
		var im = Ext.create('Push.view.push.PushList', {
			pushType : 'IMMEDIATE',
			title : '即时推送',
			columns : this.getColumn()
		});
		var tim = Ext.create('Push.view.push.PushList', {
			pushType : 'TIMING',
			title : '定时推送',
			columns : this.getColumn2()
		});
		var me = this;
		Ext.apply(this, {
			items : [im, tim]
		});
		this.callParent();
	},
	listeners : {
		scope : 'controller',
		tabchange : 'onTabChange'
	},
	getColumn : function() {
		return [{
			text : "Id",
			dataIndex : 'id',
			hidden : true
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
			width : 350
		}, {
			menuDisabled : true,
			text : "操作",
			sortable : false,
			xtype : 'actioncolumn',
			width : 100,
			items : [{
				iconCls : 'sell-col',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
				}
			}, {
				iconCls : 'application-go',
				tooltip : '再次发送',
				handler : function(grid, rowIndex, colIndex) {
				}
			}]
		}];
	},
	getColumn2 : function() {
		return [{
			text : "Id",
			dataIndex : 'id',
			hidden : true
		}, {
			text : "内容类型",
			dataIndex : 'contentType',
			width : 100
		}, {
			text : "标题",
			dataIndex : 'title',
			width : 200,
			sortable : false
		}, {
			text : "内容",
			dataIndex : 'content',
			width : 200
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
			flex : 1
		}, {
			text : "开始时间",
			dataIndex : 'startTime',
			width : 100
		}, {
			text : "下次执行时间",
			dataIndex : 'nextFireTime',
			width : 100
		}, {
			text : "上次执行时间",
			dataIndex : 'previousFireTime',
			width : 100
		}, {
			menuDisabled : true,
			text : "删除",
			sortable : false,
			xtype : 'actioncolumn',
			width : 70,
			items : [{
				iconCls : 'application-go',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
				}
			}]
		}, {
			menuDisabled : true,
			text : "再次发送",
			sortable : false,
			xtype : 'actioncolumn',
			width : 70,
			items : [{
				iconCls : 'application-go',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
				}
			}]
		}];
	}
});
