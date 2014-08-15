Ext.define('Push.store.Users', {
	extend : 'Ext.data.Store',
	model : 'Push.model.user.User',
	autoLoad: true,
	id:'user-session-store',
	proxy : {
		type : 'sessionstorage',
		id : 'user-session'
	}
});
