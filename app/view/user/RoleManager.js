/**
 * This example demonstrates several grid plugins.
 */
Ext.define('Push.view.user.RoleManager', {
	extend : 'Ext.panel.Panel',
	requires : ['Ext.grid.*'],
	xtype : 'role-manager',
	bodyStyle : 'background-color:transparent',
	id : 'role-manager-panel',
	//<example>
	exampleTitle : '角色管理',
	otherContent : [{
		type : 'Model',
		path : 'app/model/grid/Financial.js'
	}],
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
	//</example>

	height : 1400,
	width : 1000,

	initComponent : function() {
		var me = this;
		var menuToRole = Ext.create('Push.view.user.MenuToRole');
		var appToRole = Ext.create('Push.view.user.AppToRole');
		var store = Ext.create('Push.store.Roles');
		me.width = me.themeInfo.width;
		Ext.applyIf(me, {
			defaults : {
				margin : '0 0 10 0'
			},
			items : [{
				xtype : 'toolbar',
				items : ['->', {
					text : '新增角色',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.user.RoleForm');
						win.show();
					}
				}]
			}, {
				xtype : 'gridpanel',
				id : 'role-list',
				scroll : false,
				store : store,
				columns : [{
					text : "id",
					flex : 1,
					hidden : true,
					dataIndex : 'id'
				}, {
					text : "名称",
					flex : 1,
					dataIndex : 'name'
				}, {
					text : "权限",
					sortable : false,
					xtype : 'actioncolumn',
					width : 50,
					items : [{
						iconCls : 'act-col-user-edit',
						tooltip : '权限',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							menuToRole.roleId = rec.get('id');
							menuToRole.onResetClick(menuToRole.roleId);
							appToRole.roleId = rec.get('id');
							appToRole.onResetClick(appToRole.roleId);
							console.log("Edit " + rec.get('id'));
						}
					}]
				}, {
					text : "删除",
					sortable : false,
					xtype : 'actioncolumn',
					width : 50,
					items : [{
						iconCls : 'act-col-user-del',
						tooltip : '删除',
						handler : function(grid, rowIndex, colIndex) {
							Ext.MessageBox.confirm('Confirm', '确认删除吗?', function(btn, text) {
								if (btn == 'yes') {
									var rec = grid.getStore().getAt(rowIndex);
									Ext.Ajax.request({
										url : Push.util.Global.ROOT_URL + '/web/role/delete',
										method : 'POST',
										headers : {
											'Content-Type' : 'application/json; charset=utf-8'
										},
										jsonData : {
											id : rec.get('id'),
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
					}]
				}],
				columnLines : true,

				// // inline buttons
				// dockedItems : [ {
				// xtype : 'toolbar',
				// items : [{
				// text : '新增',
				// iconCls : 'add'
				// }, '-', {
				// text : '修改',
				// iconCls : 'option'
				// }, '-', {
				// itemId : 'removeButton',
				// text : '删除',
				// iconCls : 'remove',
				// },'-', {
				// itemId : 'hideButton',
				// text : '隐藏',
				// iconCls : 'remove',
				// }
				// ]
				// }],

				// frame : true,
				title : '角色',
				iconCls : 'icon-grid'
			}, menuToRole, appToRole]
		});

		me.callParent(arguments);
	}
});
