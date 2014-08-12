Ext.define('Push.view.app.AppListController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.app-list-view',
	requires : ['Push.view.ContentPanel'],
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
		CUR_APP_INFO = {
			appName : rec.get('name'),
			appId : rec.get('appId'),
			appKey : rec.get('appKey'),
			secretKey : rec.get('secretKey'),
			appKey_ios : rec.get('appKey_ios'),
			secretKey_ios : rec.get('secretKey_ios')
		};
		this.redirectTo('push-list-tabs');
	}
});
