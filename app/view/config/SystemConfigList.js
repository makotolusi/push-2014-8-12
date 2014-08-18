/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.config.SystemConfigList', {
	extend : 'Ext.grid.Panel',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'systemconfig-list-grid',
	id : 'systemconfig-list-grid',
	exampleTitle : '系统参数列表',
	requires : ['Push.util.Global'],
	height : 700,
	width : 1000,
	frame : true,
	title : '系统参数列表',
	disableSelection : true,
	loadMask : true,

	initComponent : function() {
		var me = this;
		// create the Data Store
		var store = Ext.create('Push.store.SystemConfigs');
		Ext.apply(this, {
			store : store,
			columnLines : true,
			// grid columns
			columns : [{
				dataIndex : 'id',
				hidden : true
			}, {
				text : "名称",
				dataIndex : 'key',
				width : 250
			}, {
				text : "值",
				dataIndex : 'value',
				width : 200
			}, {
				text : "描述",
				dataIndex : 'desc',
				width : 400
			},{
				menuDisabled : true,
				text : "操作",
				sortable : false,
				xtype : 'actioncolumn',
				width : 200,
				items : [{
					iconCls : 'sell-col',
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('Confirm', '确认删除吗?', function(btn, text) {
							if (btn == 'yes') {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.Ajax.request({
									url : Push.util.Global.ROOT_URL + '/web/systemconfig/delete',
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
				}, {
					iconCls : 'grid-edit',
					tooltip : '更新',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var win = Ext.create('Push.view.config.SystemConfigForm', {
							url : '/web/systemconfig/save',
							ctId : rec.get('id'),
							ctKey: rec.get('key'),
							ctValue : rec.get('value'),
							ctDesc : rec.get('desc')
						});
						win.show();
					}
				}]
			}],
			// inline buttons

			dockedItems : [{
				xtype : 'toolbar',
				items : [{
					text : '新增',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.config.SystemConfigForm', {
							url : '/web/systemconfig/save'
						});
						win.show();
					}
				}]
			}],
			// paging bar on the bottom
			bbar : Ext.create('Ext.PagingToolbar', {
				store : store,
				items : ['-']
			})
		});
		this.callParent();
	},
});
