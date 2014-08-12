Ext.define('Push.view.collection.CollectionTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.collection-tab-view',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        // newTab.setTitle('Active Tab');
        // oldTab.setTitle('Inactive Tab');
        Ext.resumeLayouts(true);
    }
});