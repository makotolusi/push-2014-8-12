/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.push.PushList', {
	extend : 'Ext.grid.Panel',

	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	xtype : 'push-list-grid',
	//<example>
	themes : {
		classic : {
			width : 1300,
			percentChangeColumnWidth : 75,
			lastUpdatedColumnWidth : 85
		},
		neptune : {
			width : 1300,
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
		var states = Ext.create('Ext.data.Store', {
			fields : ['abbr', 'name'],
			data : [{
				"abbr" : "AL",
				"name" : "IOS"
			}, {
				"abbr" : "AK",
				"name" : "ANDROID"
			}
			//...
			]
		});

		// Create the combo box, attached to the states data store
		var combo = Ext.create('Ext.form.ComboBox', {
			fieldLabel : '客户端',
			store : states,
			queryMode : 'local',
			displayField : 'name',
			valueField : 'abbr',
			renderTo : Ext.getBody()
		});
		// this.width = this.themeInfo.width;
		var pluginExpanded = false;

		// create the Data Store
		var store = Ext.create('Push.store.Pushs');
		// store.proxy.extraParams = {
		// active : '1'
		// };

		store.load({
			params : {
				pushType : this.pushType
			},
			scope : this
		});
		console.log('push-list-grid-' + this.pushType);
		Ext.apply(this, {
			id : 'push-list-grid-' + this.pushType,
			store : store,
			columnLines : true,
			// inline buttons
			dockedItems : [{
				xtype : 'toolbar',
				items : [{
					xtype : 'textfield',
					fieldLabel : '推送标题',
					name : 'title'
				}, combo, {
					text : '查询',
					id : 'push-list-query-btn-' + this.pushType
					// tooltip : 'Add a new row',
					// iconCls : 'add'
				}, {
					text : '创建推送',
					handler : function() {
						var win = Ext.create('Push.view.push.PushForm');
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
	}
});
