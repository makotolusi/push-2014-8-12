/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('Push.view.collection.CollectionLog', {
	extend : 'Ext.container.Container',

	requires : ['Ext.grid.*', 'Ext.toolbar.Paging', 'Ext.util.*', 'Ext.data.*', 'Ext.layout.container.HBox', 'Ext.layout.container.VBox', 'Push.util.Global'],
	xtype : 'collection-grid',
	id : 'collection-grid',
	//<example>
	exampleTitle : '统计',
	//</example>

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	height : 700,
	loadMask : true,
	width : 1500,
	initComponent : function() {
		var me = this;
		var session1 = Ext.getStore('Users');
		session1.load();
		var myMask = new Ext.LoadMask(Ext.getBody().component, {
			msg : "数据加载中，请等待!"
		});
		myMask.show();
		Ext.Ajax.request({
			url : Push.util.Global.ROOT_URL + '/web/configapps/findByAppid',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			jsonData : {
			},
			success : function(response) {
				myMask.hide();
				var result = Ext.decode(response.responseText);
				console.log(result);
				if (result.message == null) {
					msg = "登录首次请先进入应用选择界面功能!";
					Ext.MessageBox.alert('提示', msg, function() {
						me.getController().redirectTo('app-list-grid');
					}, this);
					return;
				}
				var collection = result.app.collection;
				me.collectionCol = Ext.decode(collection[0].code);
				me.store = Ext.create('Push.store.Collections');
				me.store.load({
					params : {
						collectionName : collection[0].name
					}
				});
				me.pageBar = Ext.create('Ext.PagingToolbar', {
					store : me.store,
					items : ['-']
				});
				var items = [];
				me.names = [];
				me.store.on('beforeload', function() {
					Ext.apply(me.store.proxy.extraParams, {
						collectionName : collection[0].name
					});
				});
				Ext.Array.each(collection, function(obj, index, countriesItSelf) {
					items.push({
						id : obj.name,
						text : obj.chName,
						scope : this,
						margin : '0 0 0 10',
						handler : function() {
							var me = this;
							var grid = Ext.getCmp('pvgrid');
							Ext.suspendLayouts();
							grid.setTitle(obj.chName);
							var me = Ext.getCmp('collection-grid');
							me.store.load({
								params : {
									collectionName : obj.name
								}
							});
							me.store.on('beforeload', function() {
								Ext.apply(me.store.proxy.extraParams, {
									collectionName : obj.name
								});
							});
							me.pageBar.bindStore(me.store);
							me.pageBar.doRefresh();
							console.log(obj.code);
							grid.reconfigure(me.store, Ext.decode(obj.code));
							console.log(me.names);
							Ext.Array.each(me.names, function(obj, index, countriesItSelf) {
								Ext.getCmp(obj).enable();
							});
							Ext.getCmp(obj.name).disable();
							Ext.resumeLayouts(true);
						}
					});
					me.names.push(obj.name);
				});
				me.add({
					xtype : 'container',
					layout : 'hbox',
					defaultType : 'button',
					items : items
				}, {
					margin : '10 0 0 0',
					xtype : 'grid',
					id : 'pvgrid',
					title : collection[0].chName,
					flex : 1,
					// viewConfig : {
					// enableTextSelection : true
					// },
					store : me.store,
					// selType : 'rowmodel',
					// plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
					// clicksToEdit : 1
					// })],
					columns : me.collectionCol,
					bbar : me.pageBar
					// viewConfig : {
					// emptyText : '数据未能取出，请重新点击刷新！',
					// deferEmptyText : false
					// }
				});
			},
			failure : function(response) {
				var text = response.responseText;
				Ext.MessageBox.alert('提示', '拉取应用配置失败!' + text, function() {
				}, this);
			}
		});
		Ext.apply(me, {
			items : {}
		});
		this.callParent();
	},

	onShowcollectionPvLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('用户行为统计');
		this.store.load({
			params : {
				collectionName : 'UserItemOperatePv'
			}
		});
		this.collectionCol.push({
			text : 'PV',
			dataIndex : 'pv',
			width : 140
		});
		grid.reconfigure(this.store, this.collectionCol);
		this.pageBar.bindStore(this.store);
		this.pageBar.doRefresh();
		this.down('#collectionPvLog').disable();
		this.down('#collectionLog').enable();
		this.down('#ItemOperatePvLog').enable();
		this.down('#ItemPvLog').enable();
		this.down('#UserGamePvLog').enable();
		this.down('#SearchKeyWordPvLog').enable();
		Ext.resumeLayouts(true);
	},

	onShowItemOperatePvLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('行为统计');
		this.store.load({
			params : {
				collectionName : 'ItemOperatePv'
			}
		});
		grid.reconfigure(this.store, [{
			text : '业务ID',
			dataIndex : 'serviceId',
			width : 140
		}, {
			text : '业务名称',
			dataIndex : 'serviceName',
			width : 200
		}, {
			text : 'GameCode',
			dataIndex : 'gameCode',
			width : 140
		}, {
			text : '游戏类型',
			dataIndex : 'gameType',
			width : 140
		}, {
			text : '游戏特征',
			dataIndex : 'gameStatus',
			width : 140
		}, {
			text : '游戏平台',
			dataIndex : 'gamePlatFormE',
			width : 140
		}, {
			text : '业务类型',
			dataIndex : 'itemTypeE',
			width : 140
		}, {
			text : '事件类型',
			dataIndex : 'operatorTypeE',
			width : 140
		}, {
			text : '上传时间',
			dataIndex : 'uploadDate',
			width : 200
		}, {
			text : 'PV',
			dataIndex : 'pv',
			width : 150
		}]);
		this.pageBar.bindStore(this.store);
		this.pageBar.doRefresh();
		this.down('#ItemOperatePvLog').disable();
		this.down('#collectionPvLog').enable();
		this.down('#collectionLog').enable();
		this.down('#ItemPvLog').enable();
		this.down('#UserGamePvLog').enable();
		this.down('#SearchKeyWordPvLog').enable();
		Ext.resumeLayouts(true);
	},
	onShowItemPvLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('业务统计');
		this.store.load({
			params : {
				collectionName : 'ItemPv'
			}
		});
		grid.reconfigure(this.store, [{
			text : '业务ID',
			dataIndex : 'serviceId',
			width : 140
		}, {
			text : '业务名称',
			dataIndex : 'serviceName',
			width : 300
		}, {
			text : 'GameCode',
			dataIndex : 'gameCode',
			width : 140
		}, {
			text : '游戏类型',
			dataIndex : 'gameType',
			width : 140
		}, {
			text : '游戏特征',
			dataIndex : 'gameStatus',
			width : 140
		}, {
			text : '游戏平台',
			dataIndex : 'gamePlatFormE',
			width : 140
		}, {
			text : '业务类型',
			dataIndex : 'itemTypeE',
			width : 140
		}, {
			text : '上传时间',
			dataIndex : 'uploadDate',
			width : 200
		}, {
			text : 'PV',
			dataIndex : 'pv',
			width : 150
		}]);
		this.pageBar.bindStore(this.store);
		this.pageBar.doRefresh();
		this.down('#ItemPvLog').disable();
		this.down('#ItemOperatePvLog').enable();
		this.down('#collectionPvLog').enable();
		this.down('#collectionLog').enable();
		this.down('#UserGamePvLog').enable();
		this.down('#SearchKeyWordPvLog').enable();
		Ext.resumeLayouts(true);
	},
	onShowUserGamePvLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('用户访问游戏统计');
		this.store.load({
			params : {
				collectionName : 'UserGamePv'
			}
		});
		grid.reconfigure(this.store, [{
			text : '业务名称',
			dataIndex : 'serviceName',
			width : 300
		}, {
			text : 'GameCode',
			dataIndex : 'gameCode',
			width : 140
		}, {
			text : '游戏类型',
			dataIndex : 'gameType',
			width : 140
		}, {
			text : '游戏特征',
			dataIndex : 'gameStatus',
			width : 140
		}, {
			text : '游戏平台',
			dataIndex : 'gamePlatFormE',
			width : 140
		}, {
			text : '业务类型',
			dataIndex : 'itemTypeE',
			width : 140
		}, {
			text : '上传时间',
			dataIndex : 'uploadDate',
			width : 200
		}, {
			text : 'PV',
			dataIndex : 'pv',
			width : 150
		}]);
		this.pageBar.bindStore(this.store);
		this.pageBar.doRefresh();
		this.down('#UserGamePvLog').disable();
		this.down('#ItemPvLog').enable();
		this.down('#ItemOperatePvLog').enable();
		this.down('#collectionPvLog').enable();
		this.down('#collectionLog').enable();
		this.down('#SearchKeyWordPvLog').enable();
		Ext.resumeLayouts(true);
	},
	onShowSearchKeyWordPvLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('搜索统计');
		this.store.load({
			params : {
				collectionName : 'SearchKeyWordPv'
			}
		});
		grid.reconfigure(this.store, [{
			text : '搜索关键字',
			dataIndex : 'keyWord',
			flex : 1
		}, {
			text : 'PV',
			dataIndex : 'pv',
			flex : 1,
			width : 150
		}]);
		this.pageBar.bindStore(this.store);
		this.pageBar.doRefresh();
		this.down('#SearchKeyWordPvLog').disable();
		this.down('#UserGamePvLog').enable();
		this.down('#ItemPvLog').enable();
		this.down('#ItemOperatePvLog').enable();
		this.down('#collectionPvLog').enable();
		this.down('#collectionLog').enable();
		Ext.resumeLayouts(true);
	}
});
