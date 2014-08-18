Ext.define('Push.store.SystemConfigs', {
	extend : 'Ext.data.Store',
	alias : 'store.Apps',
	fields : ['id', 'key', 'value', 'zhName', 'desc'],
	autoLoad : true,
	pageSize : 30,
	requires : ['Push.util.Global'],
	storeId : 'contentTypes',
	proxy : {
		type : 'ajax',
		url : Push.util.Global.ROOT_URL + '/web/systemconfig/list',
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
			rootProperty : 'page.content',
			totalProperty : 'page.rowCount'
		},
		writer : {
			type : 'json'
		}
	}
});
