Ext.define('Push.view.app.AppListController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.app-list-view',
	requires : ['Push.view.ContentPanel', 'Push.util.Global', 'Push.store.Users'],
	config : {
		control : {
		},
		refs : {
			contentPanel : 'contentPanel'
		},
		routes : {
		}
	},
	onEnter : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var session = Ext.getStore('Users');
			console.log(session);
		var user_app = {
			appName : rec.get('name'),
			appId : rec.get('appId'),
			appKey : rec.get('appKey'),
			secretKey : rec.get('secretKey'),
			appKey_ios : rec.get('appKey_ios'),
			secretKey_ios : rec.get('secretKey_ios')
		};
		session.remove(session.getData().getAt(0));
		session.add(user_app);
		// session.getData().getAt(0).data=user_app;
		//保存数据
		session.sync();
			console.log(session.getCount());
		console.log(session.getData().getAt(0).data);
		this.redirectTo('push-list-tabs');
	}
});
