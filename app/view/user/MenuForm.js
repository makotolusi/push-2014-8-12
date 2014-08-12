Ext.define('Push.view.user.MenuForm', {
	extend : 'Ext.window.Window',

	requires : ['Ext.form.Panel', 'Ext.button.Button', 'Ext.form.field.Text', 'Ext.form.field.ComboBox'],

	id : 'menu-add-window',
	bodyPadding : 10,
	title : '菜单项',
	closable : true,
	requires : ['Push.util.Global'],

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'menu-add-form',
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					value : me.opName,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'url',
					value : me.opUrl,
					fieldLabel : 'URL'
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('menu-add-form');
			var win = Ext.getCmp('menu-add-window');
			var formValue = form.getValues();
			if (win.url == '/web/operation/create') {
				formValue.manageItemId = win.manageItemId;
			}
			if (win.url == '/web/operation/update') {
				formValue.id = win.opId;
			}
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + win.url,
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('menuManager');
							p.removeAll();
							p.initComponent();
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
