/**
 * This view is used to present the details of a single Ticket.
 */
Ext.define('Push.model.user.User', {
	extend : 'Push.model.Base',

	fields : ['name', 'appName', 'appId', 'appKey', 'secretKey', 'appKey_ios', 'secretKey_ios'],
	proxy : {
		type : 'sessionstorage',
		id : 'user-session'
	}
});
