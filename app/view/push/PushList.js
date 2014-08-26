/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.push.PushList', {
	extend : 'Ext.grid.Panel',

	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.util.*', 'Ext.toolbar.Paging'],
	id : 'push-grid-xx',
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
		var me = this;
		var states = Ext.create('Ext.data.Store', {
			fields : ['name'],
			data : [{
				"name" : "IOS"
			}, {
				"name" : "ANDROID"
			}]
		});
		var jobState = Ext.create('Ext.data.Store', {
			fields : ['en', 'name'],
			data : [{
				"en" : "ENABLE",
				"name" : "启用"
			}, {
				"en" : "DISABLE",
				"name" : "暂停"
			}]
		});
		// Create the combo box, attached to the states data store
		var combo = Ext.create('Ext.form.ComboBox', {
			fieldLabel : '客户端',
			store : states,
			queryMode : 'local',
			displayField : 'name',
			valueField : 'name',
			id : 'push-clienttype-' + this.pushType,
			renderTo : Ext.getBody()
		});
		var jobStateCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel : '任务状态',
			store : jobState,
			queryMode : 'local',
			displayField : 'name',
			disabled : this.pushType == 'TIMING' ? false : true,
			valueField : 'en',
			id : 'push-jobState-' + this.pushType,
			renderTo : Ext.getBody()
		});
		// this.width = this.themeInfo.width;
		var pluginExpanded = false;

		// create the Data Store
		var store = Ext.create('Push.store.Pushs');
		store.load({
			params : {
				pushType : this.pushType
			},
			scope : this
		});
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
					id : 'push-title-' + this.pushType,
					name : 'title'
				}, combo, jobStateCombo,{
					text : '查询',
					id : 'push-list-query-btn-' + this.pushType,
					handler : function(a) {
						me.getStore().load({
							params : {
								title : Ext.getCmp('push-title-' + me.pushType).getValue(),
								clientType : Ext.getCmp('push-clienttype-' + me.pushType).getValue(),
								jobState : Ext.getCmp('push-jobState-' + me.pushType).getValue(),
								pushType : me.pushType
							}
						});
					}
				}, '->', {
					text : '创建推送',
					iconCls : 'add',
					margin : '0 30 0 0',
					handler : function(a) {
						var win = Ext.create('Push.view.push.PushForm', {
							pushType : me.pushType
						});
						win.setPosition(a.getX() - 900, a.getY() - 100);
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
