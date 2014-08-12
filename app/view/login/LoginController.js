/**
 * This View Controller is associated with the Login view.
 */
Ext.define('Push.view.login.LoginController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.login',

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
		console.log('--------------log'+this.loginText);

		if (form.isValid()) {
			// Ext.getBody().mask(this.loginText);
			// this.loginManager.login({
				// data : form.getValues(),
				// scope : this,
				// success : 'onLoginSuccess',
				// failure : 'onLoginFailure'
			// });
			this.onLoginSuccess({});
		}
	},

	onLoginFailure : function() {
		// Do something
		// Ext.getBody().unmask();
	},

	onLoginSuccess : function(user) {
		// Ext.getBody().unmask();
		this.redirectTo('all');
		this.getView().close();
		//
		// var org = this.lookupReference('organization').getSelectedRecord();
		// this.fireViewEvent('login', this.getView(), user, org, this.loginManager);
	}
});
