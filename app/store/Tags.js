Ext.define('Push.store.Tags', {
	extend : 'Ext.data.Store',
	autoLoad : false,
	model : 'Push.model.Tag',
	requires : ['Push.util.Global'],
	proxy : {
		type : 'ajax',
		actionMethods : {
			create : "POST",
			read : "POST",
			update : "POST",
			destroy : "POST"
		},
		reader : {
			type : 'json',
			rootProperty : 'data'
		},
		url : Push.util.Global.ROOT_URL + '/web/tagmanager/get'
	}
});
