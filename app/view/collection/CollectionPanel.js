/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('Push.view.collection.CollectionPanel', {
	extend : 'Ext.Container',
	xtype : 'collection-panels',
	width : 1060,
	requires : ['Ext.layout.container.Table'],

	defaults : {
		xtype : 'panel',
		width : 1100,
		// height : 200,
		bodyPadding : 10
	},
	//<example>
	themes : {
		classic : {
			percentChangeColumn : {
				width : 75
			}
		},
		neptune : {
			percentChangeColumn : {
				width : 100
			}
		}
	},
	//</example>

	initComponent : function() {
		this.items = [{
			           title: '查询',
			               collapsible: true,
			xtype : 'panel',
			height : 100,
			items : [{
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			}, {
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			}, {
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			}, {
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			}, {
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			}, {
				xtype : 'textfield',
				fieldLabel : '推送标题',
				name : 'title'
			},  {
				text : '查询',
				id : 'btnQuery'

				// tooltip : 'Add a new row',
				// iconCls : 'add'
			}]
		},{
				xtype: 'collection-list-tabs'
		}];

		this.callParent();
	}
});
