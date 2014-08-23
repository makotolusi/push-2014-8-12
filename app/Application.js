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

	views : ['config.Manual','config.ActionList','collection.JobLog','config.SystemConfigList','config.ConfigAppsList','config.ContentTypeList','config.ContentTypeForm','login.Login', 'form.FieldTypes', 'user.MenuManager', 'user.RoleManager', 'user.MenuToRole', 'collection.CollectionList', 'collection.CollectionTabs', 'collection.CollectionPanel', 'app.AppList', 'push.PushList', 'push.PushListTabs', 'navigation.Breadcrumb', 'Header', 'ContentPanel', 'navigation.Tree', 'grid.ArrayGrid', 'grid.Paging', 'grid.GridPlugins', 'form.HBoxLayoutForm', 'form.RadioGroupForm'],

	controllers : ['Global'],

	stores : ['Actions','ContentResources','ContentTypes','Navigation','States', 'Roles', 'Operations','Apps','Users'],

	model : ['ContentResource','State','MenuTree'],

	init : function() {
		// var session = this.session = new Ext.data.Session();
		//
		// this.login = new Push.view.login.Login({
		// session: session,
		// autoShow: true
		// });
		// if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
		// Ext.supports.CSS3BorderRadius = false;
		// Ext.getBody().addCls('x-nbr x-nlg');
		// }
		//
		var me = this, map = Ext.Object.fromQueryString(location.search), charts = ('charts' in map) && !/0|false|no/i.test(map.charts);

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
		Ext.create('Push.store.Navigation', {
			storeId : 'navigation'
		});
		me.setDefaultToken('all');
		//
		// Ext.setGlyphFontFamily('Pictos');
		// Ext.tip.QuickTipManager.init();
		// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	}
});
