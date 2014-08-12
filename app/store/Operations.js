Ext.define('Push.store.Operations', {
	extend : 'Ext.data.Store',
	autoLoad : true,
	alias : 'store.operations',
	model : 'Push.model.Operation',
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
			rootProperty : 'children'
		},
		url : Push.util.Global.ROOT_URL + '/web/manageItem/list'
	}
});
