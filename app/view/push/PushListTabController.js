Ext.define('Push.view.push.PushListTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.push-list-tab-view',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        // newTab.setTitle('Active Tab');
        // oldTab.setTitle('Inactive Tab');
        Ext.resumeLayouts(true);
    }
});