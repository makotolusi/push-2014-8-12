/**
 * This example shows how to create buttons.
 *
 * Buttons can contain text and an icon, and the icon can be aligned to any side of the
 * button using the `iconAlign` config.
 */
Ext.define('Push.view.config.Manual', {
	extend : 'Ext.Container',
	xtype : 'config-manual',
	cls : 'button-view',
	layout : 'vbox',
	//<example>
	themes : {
		classic : {
			width : 420,
			iconSmall : 'resources/images/icons/add16.gif',
			iconMedium : 'resources/images/icons/add24.gif',
			iconLarge : 'resources/images/icons/add.gif'
		},
		neptune : {
			width : 475,
			glyph : 72
		},
		'neptune-touch' : {
			width : 585
		}
	},
	//</example>

	initComponent : function() {
		Ext.apply(this, {
			width : this.themeInfo.width,
			items : [{
				xtype : 'container',
				layout : {
					type : 'table',
					columns : 2,
					tdAttrs : {
						style : 'padding: 5px 10px;'
					}
				},

				items : [{
					xtype : 'component',
					html : '用户行为标签'
				}, {
					xtype : 'button',
					text : '开始',
					handler : function() {
						Ext.Ajax.request({
							url : Push.util.Global.ROOT_URL + '/web/manual/sendPushTags',
							method : 'POST',
							headers : {
								'Content-Type' : 'application/json; charset=utf-8'
							},
							jsonData : {
							},
							success : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '成功', function() {
									grid.getStore().reload();
								}, this);

							},
							failure : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '失败-' + text, function() {
								}, this);
							}
						});
					}
				}, {
					xtype : 'textfield',
					emptyText : '输入token查询标签'
				}, {
					xtype : 'button',
					text : '查询'
				}, {
					xtype : 'component',
					html : 'Text Only'
				}, {
					xtype : 'button',
					text : 'Small'
				}, {
					xtype : 'component',
					html : 'Text Only'
				}, {
					xtype : 'button',
					text : 'Small'
				}]
			}]
		});
		this.callParent();
	},

	toggleDisabled : function(checkbox, newValue, oldValue) {
		var toggleFn = newValue ? 'disable' : 'enable';

		Ext.each(this.query('button'), function(item) {
			item[toggleFn]();
		});
	}
});
