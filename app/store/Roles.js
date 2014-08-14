Ext.define('Push.store.Roles', {
	extend : 'Ext.data.Store',
	autoLoad : true,
	alias : 'store.roles',
	model : 'Push.model.Role',
	requires : ['Push.util.Global'],
	proxy : {
		// load using script tags for cross domain, if the data in on the same domain as
		// this page, an HttpProxy would be better
		type : 'ajax',
		actionMethods : {
			create : "POST",
			read : "POST",
			update : "POST",
			destroy : "POST"
		},
		reader : {
			type : 'json',
			rootProperty : 'page'
		},
		url : Push.util.Global.ROOT_URL + '/web/role/list'
	}
});
