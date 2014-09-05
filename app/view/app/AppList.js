/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.app.AppList', {
	extend : 'Ext.grid.Panel',

	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging', 'Push.view.app.AppListController'],
	xtype : 'app-list-grid',
	controller : 'app-list-view',
	//<example>
	exampleTitle : '应用列表',
	
	//</example>

	height : 600,
	width : 1300,
	frame : true,
	title : '应用列表',
	// disableSelection : true,
	loadMask : true,

	initComponent : function() {
		var me = this;
		var pluginExpanded = false;
		// create the Data Store
		var store = Ext.create('Push.store.Apps');
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
				text : "应用ID",
				dataIndex : 'appId',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				text : "应用名称",
				dataIndex : 'name',
				flex : 1,
				sortable : false
			}, {
				text : "AppKey_android",
				dataIndex : 'appKey',
				flex : 1,
				hidden : false,
				sortable : true
			}, {
				text : "SecretKey_android",
				dataIndex : 'secretKey',
				flex : 1,
				align : 'right',
				sortable : true
			}, {
				text : "AppKey_ios",
				dataIndex : 'appKey_ios',
				flex : 1,
				sortable : true
			}, {
				text : "SecretKey_ios",
				dataIndex : 'secretKey_ios',
				flex : 1,
				sortable : true
			}, {
				menuDisabled : true,
				text : "推送设置",
				sortable : false,
				xtype : 'actioncolumn',
				width : 80,
				items : [{
					iconCls : 'push_phone',
					id : 'enter',
					tooltip : '推送设置',
					handler:'onEnter'
				},{
					iconCls : 'push_data',
					tooltip : '数据采集',
					handler : 'toCollectionLog'
				}]
			}],
			// inline buttons

			dockedItems : [{
				xtype : 'toolbar',
				items : [{
					xtype : 'textfield',
					fieldLabel : '应用标题',
					id : 'app-query-btn',
					anchor : '-5',
					name : 'name'
				}, {
					text : '查询',
					id : 'btnQuery',
					handler : function() {
						var store = this.findParentByType('gridpanel').getStore();
						store.load({
							params : {
								name : Ext.getCmp('app-query-btn').value
							}
						});

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
	}
});
