Ext.define('Push.store.Managers', {
	extend : 'Ext.data.Store',
	alias : 'store.Apps',
	model : 'Push.model.App',
	autoLoad : true,
	pageSize : 30,
	requires : ['Push.util.Global'],
	proxy : {
		type : 'ajax',
		url : Push.util.Global.ROOT_URL + '/web/app/list',
		paramsAsJson : true,
		actionMethods : {
			read : "POST",
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
		// sends single sort as multi parameter
		// simpleSortMode : true,
	}
	// remoteSort : true,

	// sorters : [{
	// property : 'lastpost',
	// direction : 'DESC'
	// }]
});
