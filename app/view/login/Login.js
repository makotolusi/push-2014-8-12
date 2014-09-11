Ext.define('Push.view.login.Login', {
	extend : 'Ext.window.Window',

	requires : ['Push.view.login.LoginController', 'Push.view.login.LoginModel', 'Ext.form.Panel', 'Ext.button.Button', 'Ext.form.field.Text', 'Ext.form.field.ComboBox','Push.store.Managers'],

	viewModel : 'login',
	id:'login',
	controller : 'login',
	bodyPadding : 10,
	title : '<div style="margin-left:25px">推送平台-登陆</div>',
	iconCls : 'push_login_logo',
	 // icon:'images/logo3.png',
	closable : false,
	modal : true, 	
	cls : 'login',

	items : {
		xtype : 'form',
		reference : 'form',
		items : [{
			xtype : 'textfield',
			name : 'username',
			fieldLabel : '用户名',
			allowBlank : false,
			enableKeyEvents : true,
			listeners : {
				specialKey : 'onSpecialKey'
			}
		}, {
			xtype : 'textfield',
			name : 'password',
			inputType : 'password',
			fieldLabel : '密码',
			allowBlank : false,
			enableKeyEvents : true,
			cls : 'password',
			listeners : {
				specialKey : 'onSpecialKey'
			}
		}]
	},

	buttons : [{
		text : '登入',
		listeners : {
			click : 'onLoginClick'
		}
	}]
});
