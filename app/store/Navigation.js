Ext.define('Push.store.Navigation', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.navigation',
	model : 'Push.model.MenuTree',
	requires : ['Push.util.Global'],
	storeId : 'navigation',
	autoLoad : false,
	constructor : function(config) {
		var me = this;
		//get value
		me.callParent([Ext.apply({
			
			proxy : {
				type : 'ajax',
				url : Push.util.Global.ROOT_URL + '/web/manageItem/list',
				actionMethods : {
					create : "POST",
					read : "POST",
					update : "POST",
					destroy : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'children'
				}
			},
			root : {
				text : 'All',
				id : 'all',
				expanded : true
			}
		}, config)]);
	}
});
