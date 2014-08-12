/**
 * Demonstrates a default configuration of a tab panel.
 */
Ext.define('Push.view.collection.CollectionTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'collection-list-tabs',
    controller: 'collection-tab-view',
    
    //<example>
    requires: [
        'Push.view.collection.CollectionTabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/push/TabController.js'
    }],
    exampleTitle: 'Basic Tabs',
    width: 1200,
    height: 700,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    items: [{
    	    title: '日志收集',
    	xtype: 'collection-list-grid'
    },{
        title: '用户PV',
        html: 'KitchenSink.DummyText.extraLongText'
    },{
        title: '用户PV',
        html: 'KitchenSink.DummyText.extraLongText'
    },{
        title: '用户PV',
        html: 'KitchenSink.DummyText.extraLongText'
    },{
        title: '用户PV',
        html: 'KitchenSink.DummyText.extraLongText'
    }],


    listeners: {
        scope: 'controller',
        tabchange: 'onTabChange'
    }
});