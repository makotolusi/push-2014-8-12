Ext.define('Push.view.Header', {
	extend : 'Ext.Container',
	xtype : 'appHeader',
	alias : 'widget.appHeader',
	id : 'app-header',
	height : 80,
	layout : {
		type : 'hbox',
		align : 'middle'
	},

	initComponent : function() {
		document.title = '移动端业务推送系统';
		this.items = [{
			xtype : 'component',
			id : 'app-header-logo'
		}, ,{
            xtype: 'component',
            id: 'app-header-title',
            flex: 1
        }, {
			xtype : 'logout'
		}];

		this.callParent();
	}
});
