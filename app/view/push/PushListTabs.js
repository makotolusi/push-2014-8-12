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
	pushType : 'IMMEDIATE',
	initComponent : function() {
		console.log(this.appId);
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
	getContentTypeCol : function() {
		return {
			text : "内容类型",
			dataIndex : 'contentType',
			renderer : function(value) {
				if (value == null)
					return '无';
				else
					return value.name;
			},
			width : 100
		};
	},
	getColumn : function() {
		return [{
			text : "推送时间",
			dataIndex : 'sendDate',
			width : 150
		}, {
			text : "操作员",
			dataIndex : 'manager',
			renderer : function(value) {
				if (value == null)
					return "";
				else
					return value.username;
			},
			width : 100
		}, this.getContentTypeCol(), {
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
		}, this.getOp()];
	},
	getColumn2 : function() {
		var me = this;
		return [{
			text : "Id",
			dataIndex : 'id',
			hidden : true
		}, this.getContentTypeCol(), {
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
		}
		//,      {
		// text : "开始时间",
		// dataIndex : 'startTime',
		// width : 100
		// }
		, {
			text : "任务状态",
			dataIndex : 'jobState',
			width : 100
		}, {
			text : "下次执行时间",
			dataIndex : 'nextFireTime',
			width : 150
		}, me.getOp()
		// {
		// text : "上次执行时间",
		// dataIndex : 'previousFireTime',
		// width : 100
		// },
		];
	},
	getOp : function() {
		var me = this;
		return {
			menuDisabled : true,
			text : "操作",
			sortable : false,
			xtype : 'actioncolumn',
			width : 100,
			items : [{
				iconCls : 'sell-col',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
					console.log(me.pushType);
					Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn, text) {
						if (btn == 'yes') {
							var rec = grid.getStore().getAt(rowIndex);
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/push/' + rec.get('id') + '/' + me.pushType + '/delete',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
								},
								success : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '删除成功', function() {
										grid.getStore().reload();
									}, this);

								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
									}, this);
								}
							});
						}
					});
				}
			}, {
				iconCls : 'grid-edit',
				tooltip : '更新',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					var win = Ext.create('Push.view.push.PushForm', {
						url : '/web/push/sendAgain',
						ctId : rec.get('id'),
						ctTitle : rec.get('title'),
						ctContent : rec.get('content'),
						ctClientType : rec.get('clientType'),
						userScope : rec.get('userScope'),
						keyValue : rec.get('keyValue'),
						interval : rec.get('interval'),
						contentType : rec.get('contentType'),
						tags : rec.get('tags'),
						nextFireTime : rec.get('nextFireTime'),
						pushType : me.pushType
					});
					win.setPosition(600, 50);
					win.show();
				}
			}]
		};
	}
});
