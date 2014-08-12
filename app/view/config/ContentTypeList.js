/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.config.ContentTypeList', {
	extend : 'Ext.grid.Panel',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'contenttype-list-grid',
	id : 'contenttype-list-grid',
	exampleTitle : '类型列表',
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
	height : 700,
	width : 1850,
	frame : true,
	title : '类型列表',
	disableSelection : true,
	loadMask : true,

	initComponent : function() {
		var me = this;
		this.width = this.themeInfo.width;
		var pluginExpanded = false;
		// create the Data Store
		var store = Ext.create('Push.store.Apps');
		store.proxy.extraParams = {
			active : '1'
		};
		// store.load({
		// params: {
		// group: 3,
		// type: 'user'
		// },
		// callback: function(records, operation, success) {
		// // do something after the load finishes
		// },
		// scope: this
		// });
		Ext.apply(this, {
			store : store,
			viewConfig : {
				trackOver : false,
				stripeRows : false
			},
			columnLines : true,
			// grid columns
			columns : [{
				dataIndex : 'id',
				hidden : true
			}, {
				text : "名称",
				dataIndex : 'name',
				flex : 1
			}, {
				text : "描述",
				dataIndex : 'desc',
				flex : 1
			}, {
				text : "子类型",
				dataIndex : 'subContentType',
				flex : 1
			}, {
				text : "来源",
				dataIndex : 'resourceUri',
				flex : 1
			}, {
				menuDisabled : true,
				text : "操作",
				sortable : false,
				xtype : 'actioncolumn',
				width : 100,
				items : [{
					iconCls : 'sell-col',
					tooltip : '删除',
					handler : function() {
					}
				}, {
					iconCls : 'grid-edit',
					tooltip : '更新',
					handler : function() {
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
						var win = Ext.create('Push.view.config.ContentTypeForm', {
							url : '/web/contentType/create'
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
