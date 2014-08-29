/**
 * This view is used to present the details of a single Ticket.
 */
Ext.define('Push.model.user.User', {
	extend : 'Push.model.Base',
	fields : ['username','password','name', 'appName', 'appId', 'appKey', 'secretKey', 'appKey_ios', 'secretKey_ios']
});
