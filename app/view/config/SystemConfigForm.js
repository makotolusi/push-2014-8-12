Ext.define('Push.view.config.SystemConfigForm', {
	extend : 'Ext.window.Window',
	id : 'systemconfig-add-window',
	bodyPadding : 10,
	title : '类型',
	closable : true,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'systemconfig-add-form',
				items : [{
					xtype : 'textfield',
					name : 'key',
					fieldLabel : '键',
					value : me.ctKey,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'value',
					fieldLabel : '值',
					value : me.ctValue,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'desc',
					fieldLabel : '描述',
					value : me.ctDesc,
					allowBlank : false
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('systemconfig-add-form');
			var win = Ext.getCmp('systemconfig-add-window');
			var formValue = form.getValues();
			if (win.url == '/web/systemconfig/save') {
				formValue.id = win.ctId;
			}
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + win.url ,
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('systemconfig-list-grid');
							p.getStore().reload();
							win.close();
						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
							win.close();
						}, this);
					}
				});
			}
		}
	}]

});
