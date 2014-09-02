Ext.define('Push.view.Logout', {
	extend : 'Ext.Container',
	xtype : 'logout',
	id : 'theme-switcher-btn',
	margin : '0 10 0 0',
	layout : 'hbox',
	controller : 'logout',
		requires : ['Push.view.LogoutController'],
	initComponent : function() {
		var me=this;
		var menu = new Ext.menu.Menu({
			items : [{
				text : '退出',
				handler : function() {
					console.log('logout');
					Ext.Ajax.request({
						url : Push.util.Global.ROOT_URL + '/web/manager/logout',
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json; charset=utf-8'
						},
						jsonData : {
						},
						success : function(response) {
							// me.getController().redirectTo('app-list-grid');
							   window.location.reload();
						},
						failure : function(response) {
							var text = response.responseText;
							console.log(text);
							Ext.MessageBox.alert('提示', '失败-' + text, function() {
							}, this);
						}
					});
				}
			}]
		});

		this.items = [{
			xtype : 'component',
			id : 'theme-switcher',
			cls : 'ks-theme-switcher',
			margin : '20 5 0 0',
			listeners : {
				scope : this,
				click : function(e) {
					menu.showBy(this);
				},
				element : 'el'
			}
		}];

		this.callParent();
	}
});
