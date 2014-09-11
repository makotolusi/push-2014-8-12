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
		var me = this;
		var rec = grid.getStore().getAt(rowIndex);
		console.log(rec.get('appId'));
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
		var me = this;
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
				me.redirectTo('collection-grid');
			},
			failure : function(response) {
				var text = response.responseText;
				console.log(text);
				Ext.MessageBox.alert('提示', '权限认证失败-' + text, function() {
				}, this);
			}
		});
	}
});
