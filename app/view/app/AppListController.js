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
		var me=this;
		var rec = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({
			url : Push.util.Global.ROOT_URL + '/web/manager/isLogin',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			jsonData : {
				appId : rec.get('appId')
			},
			success : function(response) {
				me.redirectTo('push-list-tabs');
			},
			failure : function(response) {
				var text = response.responseText;
				console.log(text);
				Ext.MessageBox.alert('提示', '权限认证失败-' + text, function() {
				}, this);
			}
		});

	},
	toCollectionLog : function(grid, rowIndex, colIndex) {
		// var rec = grid.getStore().getAt(rowIndex);
		// var session = Ext.getStore('Users');
		// console.log(session);
		// var user_app = {
		// appName : rec.get('name'),
		// appId : rec.get('appId'),
		// appKey : rec.get('appKey'),
		// secretKey : rec.get('secretKey'),
		// appKey_ios : rec.get('appKey_ios'),
		// secretKey_ios : rec.get('secretKey_ios')
		// };
		// session.remove(session.getData().getAt(0));
		// session.add(user_app);
		// //保存数据
		// session.sync();
		// console.log(session.getData().getAt(0).data);
		this.redirectTo('collection-grid');
	}
});
