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
		var me = this, im, tim, msg;
		Ext.Ajax.request({
			url : Push.util.Global.ROOT_URL + '/web/app/curAppInfo',
			method : 'POST',
			success : function(response) {
				var text = response.responseText;
				var obj = Ext.decode(text);
				if (obj.data == null){
					msg = "登录首次请先进入应用选择界面功能!";
						Ext.MessageBox.alert('提示', msg, function() {
							me.getController().redirectTo('app-list-grid');
						}, this);
						return ;
				}
				else
					msg = 'APP ID：' + obj.data.appId + ' <br> APP NAME：<B>' + obj.data.name + '</B> <br> ANDROID KEY：' + obj.data.appKey + "<br> ANDROID SecretKey：" + obj.data.secretKey + " <br> IOS KEY：" + obj.data.appKey_ios + " <br> IOS SecretKey：" + obj.data.secretKey_ios;
				Ext.toast({
					html : msg,
					closable : true,
					align : 't',
					slideInDuration : 400,
					minWidth : 400
				});
				if (obj.data != null) {
					me.setTitle(obj.data.name);
					// var tab=Ext.getCmp('push-grid-tabs');
					// tab.add([im, tim]);
				}
			},
			failure : function(response) {
				var text = response.responseText;
				Ext.MessageBox.alert('提示', '信息加载失败-' + text, function() {
					win.close();
				}, this);
			}
		});

					im = Ext.create('Push.view.push.PushList', {
						pushType : 'IMMEDIATE',
						title : '即时推送',
						active:true,
						columns : me.getColumn()
					});
					tim = Ext.create('Push.view.push.PushList', {
						pushType : 'TIMING',
						title : '定时推送',
						columns : me.getColumn2()
					});
		Ext.apply(me, {
			title : '',
			tabBarHeaderPosition : 2,
			flex : 1,
			plain : true,
			items : [im, tim]
		});
		me.callParent();
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
			text : "Id",
			dataIndex : 'id',
			hidden : false
		}, {
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
			hidden : false
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
		//,          {
		// text : "开始时间",
		// dataIndex : 'startTime',
		// width : 100
		// }
		, {
			text : "任务状态",
			dataIndex : 'jobState',
			width : 100
		},  {
			text : "推送状态",
			dataIndex : 'sendState',
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
					console.log(rec.get('titleColor'));
					if(me.pushType=='IMMEDIATE'||rec.get('sendState')=='待发送'){
						console.log(rec);
					var win = Ext.create('Push.view.push.PushForm', {
						url : '/web/push/sendAgain',
						ctId : rec.get('id'),
						ctTitle : rec.get('title'),
						ctContent : rec.get('content'),
						ctTitlec : rec.get('titleColor'),
						ctContentc : rec.get('contentColor'),
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
					}else{
							Ext.MessageBox.alert('提示', '定时任务已完成无法修改', function() {
									}, this);
					}
					
				}
			}]
		};
	}
});
