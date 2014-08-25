/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.user.ManagerList', {
	extend : 'Ext.grid.Panel',

	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging', 'Push.view.app.AppListController'],
	xtype : 'manager-list-grid',
	exampleTitle : '管理员列表',

	height : 700,
	width : 1000,
	frame : true,
	title : '管理员列表',
	disableSelection : true,
	loadMask : true,
	initComponent : function() {
		var me = this;
		var pluginExpanded = false;
		// create the Data Store
		var store = Ext.create('Push.store.Managers');
		store.proxy.extraParams = {
			active : '1'
		};
		Ext.apply(this, {
			store : store,
			viewConfig : {
				trackOver : false,
				stripeRows : false
			},
			 columnLines: true,
			// grid columns
			columns : [{
				text : "用户名",
				dataIndex : 'username',
				width : 80,
				hidden : false,
				sortable : true
			},{
				text : "邮箱",
				dataIndex : 'email',
				flex : 1,
				hidden : false,
				sortable : true
			},  {
				menuDisabled : true,
				text : "操作",
				sortable : false,
				xtype : 'actioncolumn',
				width : 80,
				items : [{
				iconCls : 'act-col-user-edit',
					id : 'enter',
					tooltip : '编辑',
					handler:'onEnter'
					// handler : function(grid, rowIndex, colIndex) {
						// var rec = grid.getStore().getAt(rowIndex);
						// console.log("Edit " + rec.get('name'));
						    // Ext.container.Viewport.add(Ext.create('Push.view.push.PushListTabs'));
						// // var g = Push.getApplication().getController('Root');
						// // g.redirectTo('push-list-tabs');
					// }
				},{
								iconCls : 'act-col-user-del',
					id : 'enter',
					tooltip : '删除',
					handler : 'onEnter'
				}]
			}],
			// inline buttons

			dockedItems : [{
				xtype : 'toolbar',
				items : ['->', {
					text : '新增管理员',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.user.MenuForm', {
							url : '/web/manageItem/create'
						});
						win.show();
					}
				}]
			}],
			// paging bar on the bottom
			bbar : Ext.create('Ext.PagingToolbar', {
				store : store,
				// displayInfo: false,
				// displayMsg: 'Displaying topics {0} - {1} of {2}',
				// emptyMsg: "No topics to display",
				items : ['-'
				// , {
				// text: pluginExpanded ? 'Hide Preview' : 'Show Preview',
				// pressed: pluginExpanded,
				// enableToggle: true,
				// toggleHandler: function(btn, pressed) {
				// var preview = Ext.getCmp('gv').getPlugin('preview');
				// preview.toggleExpanded(pressed);
				// btn.setText(pressed ? 'Hide Preview' : 'Show Preview');
				// }
				// }
				]
			})
		});
		this.callParent();
	},
});
