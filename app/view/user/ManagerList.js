/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.user.ManagerList', {
	extend : 'Ext.grid.Panel',

	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging', 'Push.view.app.AppListController'],
	xtype : 'manager-list-grid',
	id : 'manager-list-grid',
	exampleTitle : '管理员列表',

	height : 700,
	width : 720,
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
		me.disable = {
			// iconCls : 'action_stop',
			id : 'user-disable',
			// tooltip : '停用',
			getClass : function(v, meta, record) {
				console.log(this.items);
				if (record.get('status') == 'ON') {
					this.items[2].tooltip = '停用';
					return 'action_stop';
				} else {
					return 'action_go';
				}
			},
			handler : function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				var str = '';
				if (rec.get('status') == 'ON') {
					str = "确认停用吗?";
				} else {
					str = "确认启用吗?";
				}
				Ext.MessageBox.confirm('确认', str, function(btn, text) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : Push.util.Global.ROOT_URL + '/web/manager/status',
							method : 'POST',
							headers : {
								'Content-Type' : 'application/json; charset=utf-8'
							},
							jsonData : {
								id : rec.get('id'),
								status : rec.get('status'),
							},
							success : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '操作成功', function() {
									grid.getStore().reload();
								}, this);

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
		Ext.apply(this, {
			store : store,
			viewConfig : {
				trackOver : false,
				stripeRows : false
			},
			columnLines : true,
			// grid columns
			columns : [{
				text : "用户名",
				dataIndex : 'username',
				width : 200,
			}, {
				text : "邮箱",
				dataIndex : 'email',
				width : 200,
			}, {
				text : "状态",
				dataIndex : 'status',
				width : 200,
			}, {
				menuDisabled : true,
				text : "操作",
				sortable : false,
				xtype : 'actioncolumn',
				width : 120,
				items : [{
					iconCls : 'act-col-user-edit',
					tooltip : '编辑',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						console.log(rec.get('email'));
							var tt = [];
						Ext.Array.each(rec.get('roles'), function(name, index, countriesItSelf) {
							tt.push(name.id);
						});
						var win = Ext.create('Push.view.user.ManagerForm', {
							crud : 'update',
							mangerId : rec.get('id'),
							username : rec.get('username'),
							email : rec.get('email'),
							roles : tt
						});
						win.show();
					}
				}, {
					iconCls : 'icon_key',
					tooltip : '重置密码',
					handler : function(grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('确认', '确认密码重置?', function(btn, text) {
							if (btn == 'yes') {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.Ajax.request({
									url : Push.util.Global.ROOT_URL + '/web/manager/password/reset',
									method : 'POST',
									headers : {
										'Content-Type' : 'application/json; charset=utf-8'
									},
									jsonData : {
										id : rec.get('id'),
									},
									success : function(response) {
										var text = response.responseText;
										Ext.MessageBox.alert('提示', '重置成功', function() {
											grid.getStore().reload();
										}, this);

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
				}, me.disable]
			}],
			// inline buttons

			dockedItems : [{
				xtype : 'toolbar',
				items : ['->', {
					text : '新增管理员',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.user.ManagerForm', {
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
