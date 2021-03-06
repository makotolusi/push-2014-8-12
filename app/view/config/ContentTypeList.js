/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.config.ContentTypeList', {
	extend : 'Ext.grid.Panel',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'contenttype-list-grid',
	id : 'contenttype-list-grid',
	exampleTitle : '类型列表',
	requires : ['Push.util.Global'],
	height : 700,
	width : 1500,
	frame : true,
	title : '类型列表',
	disableSelection : false,
	loadMask : true,

	initComponent : function() {
		var me = this;
		// create the Data Store
		var store = Ext.create('Push.store.ContentTypes');
		Ext.apply(this, {
			store : store,
			columnLines : true,
			// grid columns
			columns : [{
				menuDisabled : true,
				text : "操作",
				sortable : false,
				xtype : 'actioncolumn',
				width : 80,
				items : [{
					iconCls : 'sell-col',
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('Confirm', '确认删除吗?', function(btn, text) {
							if (btn == 'yes') {
								var rec = grid.getStore().getAt(rowIndex);
								Ext.Ajax.request({
									url : Push.util.Global.ROOT_URL + '/web/contentType/delete',
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
						var sct = [];
						Ext.Array.each(rec.get('action'), function(name, index, countriesItSelf) {
							sct.push(name.id);
						});
						var win = Ext.create('Push.view.config.ContentTypeForm', {
							url : '/web/contentType/update',
							ctId : rec.get('id'),
							ctIndex : rec.get('index'),
							ctDesc : rec.get('desc'),
							ctName : rec.get('name'),
							resourceUri : rec.get('resourceUri'),
							ctTag : rec.get('tag'),
							tagConstant : rec.get('tagConstant'),
							action : sct,
							cate : rec.get('cate'),
							code : rec.get('code')
						});
						win.show();
					}
				}]
			},{
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
				width : 240
			}, {
				text : "标签变量",
				dataIndex : 'tag',
				width : 150
			}, {
				text : "标签常亮",
				dataIndex : 'tagConstant',
				width : 150
			}, {
				text : "英文",
				dataIndex : 'desc',
				width : 200
			}, {
				text : "标识",
				dataIndex : 'index',
				width : 100
			}, {
				text : "分类",
				dataIndex : 'cate',
				width : 100
			}, {
				text : "来源",
				dataIndex : 'resourceUri',
				width : 450
			}],
			// inline buttons

			dockedItems : [{
				xtype : 'toolbar',
				items : [{
					text : '新增',
					iconCls : 'add',
					handler : function() {
						var win = Ext.create('Push.view.config.ContentTypeForm', {
							url : '/web/contentType/create'
						});
						win.show();
					}
				}]
			}],
			// paging bar on the bottom
			// bbar : Ext.create('Ext.PagingToolbar', {
				// store : store,
				// items : ['-']
			// })
		});
		this.callParent();
	},
});
