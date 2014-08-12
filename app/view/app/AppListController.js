Ext.define('Push.view.app.AppListController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.app-list-view',
	requires : ['Push.view.ContentPanel', 'Push.util.Global', 'Push.model.user.User'],
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
		var session = Ext.create('Ext.data.Store', {
			model : 'Push.model.user.User',
		});
		var user_app = {
			appName : rec.get('name'),
			appId : rec.get('appId'),
			appKey : rec.get('appKey'),
			secretKey : rec.get('secretKey'),
			appKey_ios : rec.get('appKey_ios'),
			secretKey_ios : rec.get('secretKey_ios')
		};
		session.remove(user_app);
		session.add(user_app);
		//保存数据
		session.sync();
		console.log(session.getCount());
		this.redirectTo('push-list-tabs');
	}
});
