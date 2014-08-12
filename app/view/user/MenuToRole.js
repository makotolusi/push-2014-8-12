/**
 * This example shows how to setup two way drag and drop from one GridPanel to another.
 */
Ext.define('Push.view.user.MenuToRole', {
	extend : 'Ext.panel.Panel',
	requires : ['Ext.grid.*'],
	xtype : 'user-menu-role',
	//<example>
	exampleTitle : 'Drag and Drop from Grid to Grid Example',
	otherContent : [{
		type : 'Model',
		path : 'app/model/Operation.js'
	}],
	//</example>
requires : ['Push.util.Global'],
	width : 1000,
	height : 600,
	layout : {
		type : 'hbox',
		align : 'stretch',
		padding : 5
	},

	initComponent : function() {
		var me = this;
		var store = new Ext.data.Store({
			autoLoad : true,
			model : Push.model.Operation,
			proxy : {
				type : 'ajax',
				extraParams : {
					roleId : me.roleId,
					out : 3
				},
				actionMethods : {
					create : "POST",
					read : "POST",
					update : "POST",
					destroy : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				},
				url : Push.util.Global.ROOT_URL + '/web/operation/listRoleOperation'
			}
		});
		var group1 = this.id + 'group1', group2 = this.id + 'group2', columns = [{
			text : 'ID',
			flex : 1,
			dataIndex : 'orderId'
		}, {
			text : '名称',
			flex : 1,
			dataIndex : 'name'
		}, {
			text : 'url',
			flex : 1,
			dataIndex : 'url'
		}, {
			text : 'manageItemId',
			flex : 1,
			dataIndex : 'manageItemId'
		}];

		this.items = [{
			itemId : 'grid1',
			flex : 1,
			xtype : 'grid',
			multiSelect : true,
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : group1,
					dropGroup : group2
				},
				listeners : {
					drop : function(node, data, dropRec, dropPosition) {
						var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
						// Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
					}
				}
			},
			store : store,
			columns : columns,
			title : '菜单列表',
			tools : [{
				type : 'refresh',
				tooltip : 'Reset both grids',
				scope : this,
				handler : this.onResetClick
			}],
			margin : '0 5 0 0'
		}, {
			itemId : 'grid2',
			flex : 1,
			xtype : 'grid',
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : group2,
					dropGroup : group1
				},
				listeners : {
					beforedrop : function(node, data, overModel, dropPosition, dropHandlers) {
						dropHandlers.wait = true;
						if (me.roleId == '' || me.roleId == undefined) {
							Ext.MessageBox.alert('提示', '请选择角色!', function() {
							}, this);
							dropHandlers.cancelDrop();
						} else
							dropHandlers.processDrop();
					},
					drop : function(node, data, dropRec, dropPosition) {
						var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
						var ids = [];
						for (var i = 0; i < data.records.length; i++) {
							ids.push(data.records[i].get('id'));
						}
						Ext.Ajax.request({
							url : Push.util.Global.ROOT_URL + '/web/operation/addRoles',
							method : 'POST',
							params : {
								roleId : me.roleId,
								ids : ids,
							},
							success : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '创建成功', function() {
									this.onResetClick(me.roleId);
								}, this);
							},
							failure : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
									win.close();
								}, this);
							}
						});
					}
				}
			},
			store : new Ext.data.Store({
				autoLoad : true,
				model : Push.model.Operation,
				proxy : {
					type : 'ajax',
					extraParams : {
						roleId : me.roleId,
						out : 0
					},
					actionMethods : {
						create : "POST",
						read : "POST",
						update : "POST",
						destroy : "POST"
					},
					reader : {
						type : 'json',
						rootProperty : 'data'
					},
					url : Push.util.Global.ROOT_URL + '/web/operation/listRoleOperation'//+me.roleId
				}
			}),
			columns : columns,
			stripeRows : true,
			title : '权限列表'
		}];

		this.callParent();
	},

	onResetClick : function(roleId) {
		//refresh source grid
		this.down('#grid1').getStore().load({
			params : {
				roleId : roleId,
				out : 1
			}
		});
		//purge destination grid
		this.down('#grid2').getStore().load({
			params : {
				roleId : roleId,
				out : 0
			}
		});
	}
});
