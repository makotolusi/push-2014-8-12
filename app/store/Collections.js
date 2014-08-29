Ext.define('Push.store.Collections', {
	extend : 'Ext.data.Store',
	autoLoad : false,
	model : 'Push.model.Collection',
	requires : ['Push.util.Global'],
	idProperty : 'collecions',
	proxy : {
		type : 'ajax',
		actionMethods : {
			create : "POST",
			read : "POST",
			update : "POST",
			destroy : "POST"
		},
		paramsAsJson : true,
		headers : {
			'Content-Type' : 'application/json; charset=utf-8',
			'Accept' : 'application/json'
		},
		reader : {
			type : 'json',
			rootProperty : 'page.content',
			totalProperty : 'page.rowCount'
		},
		url : Push.util.Global.ROOT_URL + '/web/collection/listClientLogCollection'
	}
});
