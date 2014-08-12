Ext.define('Push.model.App', {
	extend : 'Push.model.Base',
	fields : ['name', 'appId', 'appKey', 'secretKey', 'appKey_ios', 'secretKey_ios']
	// requires : ['Push.util.JsonAjaxProxy'],

});
