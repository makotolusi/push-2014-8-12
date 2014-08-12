Ext.define('Push.model.Push', {
	extend : 'Push.model.Base',
	fields : ['id', 'contentType', 'title', 'content', 'clientType', 'userScope','sendState',{name:'tags',type:'auto'}]
});
