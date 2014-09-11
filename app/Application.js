/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.define('Push.Application', {
	extend : 'Ext.app.Application',
	name : 'Push',
	namespace : 'Push',
	requires : ['Push.view.login.Login'],
	autoCreateViewport : false,
	views : ['user.AppToRole','push.AutoPushList','Logout', 'config.ConfigCollectionsList', 'collection.CollectionLog', 'user.ManagerList', 'config.Manual', 'config.ActionList', 'collection.JobLog', 'config.SystemConfigList', 'config.ConfigAppsList', 'config.ContentTypeList', 'config.ContentTypeForm', 'login.Login', 'form.FieldTypes', 'user.MenuManager', 'user.RoleManager', 'user.MenuToRole', 'app.AppList', 'push.PushList', 'push.PushListTabs', 'navigation.Breadcrumb', 'Header', 'ContentPanel', 'navigation.Tree', 'grid.ArrayGrid', 'grid.Paging', 'grid.GridPlugins', 'form.HBoxLayoutForm', 'form.RadioGroupForm'],

	controllers : ['Global'],

	stores : ['Managers', 'Actions', 'ContentResources', 'ContentTypes', 'Navigation', 'States', 'Roles', 'Operations', 'Apps', 'Users'],

	model : ['ContentResource', 'State', 'MenuTree'],

	init : function() {
		console.log('init');
		this.on({

			stopEvents : function() {
				Ext.TaskManager.stopAll();
			}
		});
		var me = this;
		var store = Ext.create('Push.store.Navigation', {
			storeId : 'navigation'
		});
		store.on("load", function() {
			Ext.Ajax.request({
				url : Push.util.Global.ROOT_URL + '/web/manager/isLogin',
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json; charset=utf-8'
				},
				jsonData : {
				},
				success : function(response) {
					var text = response.responseText;
					console.log('------' + text);
					var r = Ext.decode(text);
					if (r.SUC) {
							me.redirectTo('app-list-grid');
							console.log(Ext.getCmp('app-main'));
					}else{
						var session = this.session = new Ext.data.Session();
						new Push.view.login.Login({
							session : session,
							autoShow : true
						});
					}
				},
				failure : function(response) {
					var text = response.responseText;
					console.log(text);
					Ext.MessageBox.alert('提示', '登录失败-' + text, function() {
					}, this);
				}
			});
	if(!Ext.getCmp('app-main')){
						Ext.create('Push.view.main.Main', {
				renderTo : Ext.getBody()
			});			
							}
			
		});

	},
	launch : function() {

		// console.log('launch');
	}
});
