/**
 * This View Controller is associated with the Login view.
 */
Ext.define('Push.view.login.LoginController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.login',
	requires : ['Push.util.Global'],
	loginText : 'Logging in...',

	constructor : function() {
		this.callParent(arguments);

		this.loginManager = Ext.create('Push.LoginManager', {
			session : this.session,
			model : Ext.create('Push.model.user.User')
		});
	},

	onSpecialKey : function(field, e) {
		if (e.getKey() === e.ENTER) {
			this.doLogin();
		}
	},

	onLoginClick : function() {
		this.doLogin();
	},

	doLogin : function() {
		var form = this.lookupReference('form');
		if (form.isValid()) {
			Ext.getBody().mask(this.loginText);
			this.loginManager.login({
				data : form.getValues(),
				scope : this,
				success : 'onLoginSuccess',
				failure : 'onLoginFailure'
			});

		}
	},

	onLoginFailure : function(obj) {
		// Do something
		// Ext.getBody().unmask();
		Ext.MessageBox.alert('提示', '登陆失败:' + Ext.decode(obj.responseText).msg, function() {
		}, this);
	},

	onLoginSuccess : function(user) {
		var me=this;
		Ext.getBody().unmask();
		this.getView().close();
		Ext.StoreMgr.get('navigation').reload();
		Ext.StoreMgr.get('navigation').on("load", function() {
			console.log('onLoginSuccess');
			me.redirectTo('app-list-grid');
		});
	}
});
