/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.config.ConfigAppsList', {
	extend : 'Ext.grid.Panel',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'configapps-list-grid',
	id : 'configapps-list-grid',
	exampleTitle : '应用配置列表',
	requires : ['Push.util.Global'],
	height : 700,
	width : 1500,
	frame : true,
	title : '应用配置列表',
	disableSelection : true,
	loadMask : true,
	initComponent : function() {
		var me = this;
		// create the Data Store
		var store = Ext.create('Push.store.ConfigApps');
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
				text : "所有应用",
				dataIndex : 'appIds',
				width : 300,
			}, {
				text : "内容类型",
				dataIndex : 'contentTypes',
				renderer : function(value) {
					var dd = '';
					Ext.Array.each(value, function(name, index, countriesItSelf) {
						dd += name.name + ",";
					});
					return dd;
				},
				width : 350,
			},{
				text : "标签类型",
				dataIndex : 'tagTypes',
				renderer : function(value) {
					var dd = '';
					Ext.Array.each(value, function(name, index, countriesItSelf) {
						dd += name.name + ",";
					});
					return dd;
				},
				width : 300,
			},{
				text : "打标签",
				dataIndex : 'tag',
				renderer : function(value) {
					var dd = '';
					Ext.Array.each(value, function(name, index, countriesItSelf) {
						dd += name.name + ",";
					});
					return dd;
				},
				width : 300,
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
									url : Push.util.Global.ROOT_URL + '/web/configapps/delete',
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
						Ext.Array.each(rec.get('contentTypes'), function(name, index, countriesItSelf) {
							ca.push(name.id);
						});
						var tags = [];
						Ext.Array.each(rec.get('tagTypes'), function(name, index, countriesItSelf) {
							tags.push(name.id);
						});
						var tt = [];
						Ext.Array.each(rec.get('tag'), function(name, index, countriesItSelf) {
							tt.push(name.id);
						});
						var win = Ext.create('Push.view.config.ConfigAppsForm', {
							url : '/web/configapps/update',
							caId : rec.get('id'),
							caName : rec.get('name'),
							caAppIds : rec.get('appIds'),
							caContentTypes : ca,
							caTag : tt,
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
						var win = Ext.create('Push.view.config.ConfigAppsForm', {
							url : '/web/configapps/create'
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
