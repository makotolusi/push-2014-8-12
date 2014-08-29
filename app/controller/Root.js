/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('Push.controller.Root', {
	extend : 'Ext.app.Controller',
	requires : ['Push.view.*'],
	stores : [],
	config : {
		control : {
		},
		refs : {
		},
		routes : {
		}
	},
	loadingText : 'Loading...',

	onLaunch : function() {
				console.log('--------------showUI');
		// if (Ext.isIE8) {
		// Ext.Msg.alert('Not Supported', 'This example is not supported on Internet Explorer 8. Please use a different browser.');
		// return;
		// }
	
	},
	onLogin : function(loginController, user, organization, loginManager) {
		// this.login.destroy();
		// this.loginManager = loginManager;
		// this.user = user;
		this.showUI();
	},

	showUI : function() {
		console.log('showUI');
		Ext.create('Push.store.Navigation', {
			storeId : 'navigation'
		});
		this.setDefaultToken('all');
				console.log(this.viewport);
		this.viewport = new Push.view.main.Main({
			session : this.session,
			viewModel : {
				data : {
					currentUser : this.user
				}
			}
		});
	},

	getSession : function() {
		return this.session;
	}
});
