/**
 * This example demonstrates several grid plugins.
 */
Ext.define('Push.view.user.MenuManager', {
	extend : 'Ext.panel.Panel',
	requires : ['Ext.grid.Panel', 'Ext.grid.column.Number', 'Ext.grid.column.Date', 'Ext.grid.column.Boolean', 'Ext.grid.View', 'Ext.selection.CheckboxModel', 'Push.model.grid.Financial'],
	id : 'menuManager',
	xtype : 'menu-manager',
	bodyStyle : 'background-color:transparent',
	//<example>
	exampleTitle : '菜单项管理',
	themes : {
		classic : {
			width : 1000,
			percentChangeColumnWidth : 75,
			lastUpdatedColumnWidth : 85
		},
		neptune : {
			width : 1000,
			percentChangeColumnWidth : 100,
			lastUpdatedColumnWidth : 115
		}
	},

	height : 1400,
	width : 1000,

	initComponent : function() {
		var me = this;
		me.width = me.themeInfo.width;
		Ext.applyIf(me, {
			defaults : {
				margin : '0 0 10 0'
			}
		});
		//item list
		this.showMenu();
		me.callParent(arguments);
	},

	showMenu : function() {
		var me = this;
		var store = Ext.create('Push.store.Operations', {
			proxy : {
				type : 'ajax',
				actionMethods : {
					create : "POST",
					read : "POST",
					update : "POST",
					destroy : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'children'
				},
				url : Push.util.Global.ROOT_URL + '/web/manageItem/listAll'
			}
		});
		store.on("load", function() {
			me.add({
				xtype : 'toolbar',
				items : ['->', {
					text : '新增菜单项',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.user.MenuForm', {
							url : '/web/manageItem/create'
						});
						win.show();
					}
				}]
			});
			var num = store.getCount();
			for (var i = 0; i < num; i++) {
				var itemTitle = store.getAt(i).get('name');
				var itemId = store.getAt(i).get('id');
				var operations = store.getAt(i).get('operations');
				var opStore = Ext.create('Ext.data.Store', {
					model : 'Push.model.Operation',
					data : operations
				});
				me.add({
					xtype : 'gridpanel',
					scroll : false,
					store : opStore,
					columns : [{
						text : "id",
						hidden : true,
						dataIndex : 'id'
					}, {
						text : "名称",
						flex : 1,
						dataIndex : 'name'
					}, {
						text : "地址",
						flex : 1,
						dataIndex : 'url'
					}],
					columnLines : true,

					// inline buttons
					dockedItems : [{
						xtype : 'toolbar',
						manageItemId : itemId,
						items : [{
							text : '新增',
							iconCls : 'add',
							handler : function() {
								var win = Ext.create('Push.view.user.MenuForm', {
									url : '/web/operation/create',
									manageItemId : this.up('toolbar').manageItemId
								});
								win.show();
							}
						}, '-', {
							text : '修改',
							iconCls : 'option',
							handler : function() {
								var grid = this.findParentByType('gridpanel');
								var row = grid.getSelectionModel().getSelection()[0];
								if (row == undefined) {
									Ext.MessageBox.alert('提示', '请选表格中的内容后进行修改!', function() {
									}, this);
								} else {
									var win = Ext.create('Push.view.user.MenuForm', {
										url : '/web/operation/update',
										opName : row.get('name'),
										opId : row.get('id'),
										opUrl : row.get('url')
									});
									win.show();
								}
							}
						}, '-', {
							itemId : 'removeButton',
							text : '删除',
							iconCls : 'remove',
							handler : function() {
								var grid = this.findParentByType('gridpanel');
								var row = grid.getSelectionModel().getSelection()[0];
								if (row == undefined) {
									Ext.MessageBox.alert('提示', '请选表格中的内容后进行修改!', function() {
									}, this);
								} else {
									Ext.Ajax.request({
										url : Push.util.Global.ROOT_URL + '/web/operation/delete',
										method : 'POST',
										headers : {
											'Content-Type' : 'application/json; charset=utf-8'
										},
										jsonData : {
											id : row.get('id'),
											manageItemId : this.up('toolbar').manageItemId
										},
										success : function(response) {
											var text = response.responseText;
											Ext.MessageBox.alert('提示', '创建成功', function() {
												me.removeAll();
												me.initComponent();
											}, this);

										},
										failure : function(response) {
											var text = response.responseText;
											Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
											}, this);
										}
									});
								}
							}
						}, '-', {
							itemId : 'hideButton',
							text : '隐藏',
							iconCls : 'remove',
						}]
					}],

					// frame : true,
					title : itemTitle,
					iconCls : 'icon-grid'
				});
			}

		});
	}
});
