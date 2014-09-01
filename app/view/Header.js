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
		document.title = this.title;
		this.items = [{
			xtype : 'component',
			id : 'app-header-logo'
		}, ,{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1
        }, {
			xtype : 'logout'
		}];

		this.callParent();
	}
});
