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

	views : ['config.ConfigCollectionsList', 'collection.CollectionLog', 'user.ManagerList', 'config.Manual', 'config.ActionList', 'collection.JobLog', 'config.SystemConfigList', 'config.ConfigAppsList', 'config.ContentTypeList', 'config.ContentTypeForm', 'login.Login', 'form.FieldTypes', 'user.MenuManager', 'user.RoleManager', 'user.MenuToRole', 'app.AppList', 'push.PushList', 'push.PushListTabs', 'navigation.Breadcrumb', 'Header', 'ContentPanel', 'navigation.Tree', 'grid.ArrayGrid', 'grid.Paging', 'grid.GridPlugins', 'form.HBoxLayoutForm', 'form.RadioGroupForm'],

	controllers : ['Global'],

	stores : ['Managers', 'Actions', 'ContentResources', 'ContentTypes', 'Navigation', 'States', 'Roles', 'Operations', 'Apps', 'Users'],

	model : ['ContentResource', 'State', 'MenuTree'],

	init : function() {

		var session = Ext.getStore('Users');
		session.load();
		console.log('session.getData()');
		console.log(session.getData().getAt(0));
		if (session.getData().getAt(0) == undefined) {
			var session = this.session = new Ext.data.Session();
			console.log(this.session);
			this.login = new Push.view.login.Login({
				session : session,
				autoShow : true
			});
		}

		//
		var me = this;

		// var store = Ext.create('Push.store.Operations');
		// var navItems = {};
		// store.on("load", function() {
		// var num = store.getCount();
		// for (var i = 0; i < num; i++) {
		// var operations = store.getAt(i).get('operations');
		// navItems.id = store.getAt(i).get('url');
		// navItems.text = store.getAt(i).get('name');
		// navItems.expanded = true;
		// navItems.children = [];
		// for (var j = 0; j < operations.length; j++) {
		// var obj = {};
		// obj.id = operations[j].url;
		// obj.text = operations[j].name;
		// obj.leaf = true;
		// navItems.children.push(obj);
		// }
		// }
		// //display
		//
		// });
		Ext.create('Push.store.Navigation');
		this.redirectTo('app-list-grid');
		// var viewport = Ext.create('Push.view.main.Main');
		// Ext.Viewport.add(viewport);
		//
		// Ext.setGlyphFontFamily('Pictos');
		// Ext.tip.QuickTipManager.init();
		// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	}
});
