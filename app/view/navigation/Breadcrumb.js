Ext.define('Push.view.navigation.Breadcrumb', {
	extend : 'Ext.toolbar.Toolbar',
	id : 'navigation-breadcrumb',
	xtype : 'navigation-breadcrumb',

	config : {
		selection : null
	},

	initComponent : function() {
				console.log('Breadcrumb');
		var store=Ext.StoreMgr.get('navigation');
		console.log(store.getRoot().childNodes[0]);
		this.items = [{
			xtype : 'tool',
			type : 'down',
			tooltip : '切换',
			listeners : {
				click : 'showTreeNav'
			}
		}, {
			xtype : 'breadcrumb',
			reference : 'toolbar',
			flex : 1,
			// Start with "Ext JS > dd > DragZone.js" selected
            selection: store.getRoot().childNodes[0],
			store :store 
		}];
		this.callParent();
		this._breadcrumbBar = this.items.getAt(1);
	},
	updateSelection : function(node) {
		if (this.rendered) {
			this._breadcrumbBar.setSelection(node);
		}
	}
});
