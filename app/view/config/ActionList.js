/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.config.ActionList', {
	extend : 'Ext.grid.Panel',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'action-list-grid',
	id : 'action-list-grid',
	exampleTitle : '行为配置列表',
	requires : ['Push.util.Global'],
	height : 700,
	width : 1000,
	frame : true,
	title : '行为配置列表',
	disableSelection : true,
	loadMask : true,
	initComponent : function() {
		var me = this;
		// create the Data Store
		var store = Ext.create('Push.store.Actions');
		Ext.apply(this, {
			store : store,
			columnLines : true,
			// grid columns
			columns : [{
				dataIndex : 'id',
				hidden : true
			}, {
				text : "名称",
				dataIndex : 'name',
				width : 150
			}, {
				text : "行为",
				dataIndex : 'action',
				renderer : function(value) {
					var dd = '';
					Ext.Array.each(value, function(name, index, countriesItSelf) {
						dd += name.name + ",";
					});
					return dd;
				},
				width : 350,
			}, {
				text : "标签",
				dataIndex : 'tags',
				renderer : function(value) {
					var dd = '';
					Ext.Array.each(value, function(name, index, countriesItSelf) {
						dd += name.name + ",";
					});
					return dd;
				},
				width : 350,
			}, {
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
									url : Push.util.Global.ROOT_URL + '/web/contentType/deleteAction',
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
						}, this);
					}
				}, {
					iconCls : 'grid-edit',
					tooltip : '更新',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var ca = [];
						Ext.Array.each(rec.get('action'), function(name, index, countriesItSelf) {
							ca.push(name.id);
						});
						var tags = [];
						Ext.Array.each(rec.get('tags'), function(name, index, countriesItSelf) {
							tags.push(name.id);
						});
						var win = Ext.create('Push.view.config.ActionForm', {
							url : '/web/contentType/saveAction',
							caId : rec.get('id'),
							caName : rec.get('name'),
							caContentTypes : ca,
							caTagTypes : tags
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
						var win = Ext.create('Push.view.config.ActionForm', {
							url : '/web/contentType/saveAction'
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
