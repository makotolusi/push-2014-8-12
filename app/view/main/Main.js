/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Push.view.main.Main', {
	extend : 'Ext.container.Viewport',
	requires : ['Ext.tab.Panel', 'Ext.layout.container.Border'],
	xtype : 'app-main',

	controller : 'main',
	viewModel : 'main',
	stateful : true,
	layout : 'border',
	stateId : 'push-viewport',

	items : [{
		region : 'north',
		xtype : 'appHeader'
	}, {
		region : 'center',
		xtype : 'contentPanel',
		reference : 'contentPanel',
		dockedItems : [{
			xtype : 'navigation-breadcrumb',
			reference : 'breadcrumb>'
		}]
	}],
	applyState : function(state) {
		this.getController().applyState(state);

	},

	getState : function() {
		return this.getController().getState();
	}
});
