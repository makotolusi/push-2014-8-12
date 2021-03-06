Ext.define('Push.store.ConfigCollections', {
	extend : 'Ext.data.Store',
	alias : 'store.Apps',
	model : 'Push.model.ConfigCollection',
	autoLoad : true,
	pageSize : 30,
	requires : ['Push.util.Global'],
	proxy : {
		type : 'ajax',
		url : Push.util.Global.ROOT_URL + '/web/configcollections/list',
		paramsAsJson : true,
		actionMethods : {
			read : "POST"
		},
		extraParams : {
		},
		headers : {
			'Content-Type' : 'application/json; charset=utf-8',
			'Accept' : 'application/json'
		},
		reader : {
			type : 'json',
			rootProperty:'page.content',
			totalProperty : 'page.rowCount'
		},
		writer : {
			type : 'json'
		}
	}
});
