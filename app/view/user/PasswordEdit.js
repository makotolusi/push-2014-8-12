/**
 * This example shows how to use the number field.
 */
Ext.apply(Ext.form.VTypes, {
	password : function(val, field) {
		if (field.confirmTo) {
			var pwd = Ext.getCmp(field.confirmTo);
			if (val == pwd.getValue()) {
				return true;
			} else {
				return false;
			}
			return false;
		}
	}
});

Ext.define('Push.view.user.PasswordEdit', {
	extend : 'Ext.form.Panel',
	xtype : 'password-edit',

	//<example>
	requires : [],

	exampleTitle : '修改密码',
	//</example>

	title : '修改密码',
	bodyPadding : 5,
	frame : true,
	width : 340,

	fieldDefaults : {
		labelWidth : 110,
		anchor : '100%'
	},

	items : {
		xtype : 'form',
		reference : 'form',
		id : 'cpf',
		items : [{
			xtype : 'textfield',
			fieldLabel : '新密码',
			name : 'operatorNewPass',
			id : 'p_NewPassword',
			width : 150,
			inputType : 'password',
			allowBlank : false
		}, {
			xtype : 'textfield',
			fieldLabel : '确认密码',
			name : 'operatorConPass',
			id : 'p_ConfirmPassword',
			width : 150,
			inputType : 'password',
			vtype : 'password',
			vtypeText : "两次密码不一致！",
			confirmTo : 'p_NewPassword',
			allowBlank : false
		}]
	},

	buttons : [{
		text : '更新',
		handler : function() {
			var changePasswordFrom = Ext.getCmp('cpf');
			if (!changePasswordFrom.getForm().isValid()) {
				return;
			}
			Ext.Ajax.request({
				url : Push.util.Global.ROOT_URL + '/web/manager/password/edit?pw='+Ext.getCmp('p_NewPassword').getValue(),
				method : 'POST',
				param : {
				},
				success : function(response) {
					var text = response.responseText;
					Ext.MessageBox.alert('提示', '成功', function() {
					}, this);

				},
				failure : function(response) {
					var text = response.responseText;
					Ext.MessageBox.alert('提示', '失败-' + text, function() {
					}, this);
				}
			});
		}
	}]
});
