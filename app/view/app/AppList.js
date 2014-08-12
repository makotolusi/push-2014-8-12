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
	themes : {
		classic : {
			width : 1500,
			percentChangeColumnWidth : 75,
			lastUpdatedColumnWidth : 85
		},
		neptune : {
			width : 1500,
			percentChangeColumnWidth : 100,
			lastUpdatedColumnWidth : 115
		}
	},
	//</example>

	height : 700,
	width : 1850,
	frame : true,
	title : '应用列表',
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
				// renderer: this.renderLast,
				sortable : true
			}, {
				text : "SecretKey_ios",
				dataIndex : 'secretKey_ios',
				flex : 1,
				// renderer: this.renderLast,
				sortable : true
			}, {
				menuDisabled : true,
				text : "推送设置",
				sortable : false,
				xtype : 'actioncolumn',
				width : 80,
				items : [{
					iconCls : 'application-go',
					id : 'enter',
					tooltip : '推送设置',
					handler:'onEnter'
					// handler : function(grid, rowIndex, colIndex) {
						// var rec = grid.getStore().getAt(rowIndex);
						// console.log("Edit " + rec.get('name'));
						    // Ext.container.Viewport.add(Ext.create('Push.view.push.PushListTabs'));
						// // var g = Push.getApplication().getController('Root');
						// // g.redirectTo('push-list-tabs');
					// }
				}]
			}, {
				menuDisabled : true,
				text : "数据采集",
				sortable : false,
				xtype : 'actioncolumn',
				width : 80,
				items : [{
					iconCls : 'application-go',
					id : 'enter',
					tooltip : '推送设置',
					handler : 'onEnter'
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
