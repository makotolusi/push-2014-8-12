Ext.define('Push.model.MenuTree', {
	extend : 'Ext.data.TreeModel',
	fields : [{
		name : 'text',
		mapping:'name'
	},{
		name : 'id',
		mapping:'url'
	},{
		name : 'children',
		mapping:'operations'
	}]
});
