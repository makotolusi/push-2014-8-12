Ext.define('Push.store.ForumThreads', {
    extend: 'Ext.data.Store',

    alias: 'store.forumthreads',
    model: 'Push.model.grid.ForumThread',
   autoLoad: {},
    pageSize: 50,
    remoteSort: true,
     proxy: {
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        type: 'jsonp',
        url: 'http://www.sencha.com/forum/topics-browse-remote.php',
        reader: {
            rootProperty: 'topics',
            totalProperty: 'totalCount'
        },
        // sends single sort as multi parameter
        simpleSortMode: true,
    },
    sorters: [{
        property: 'lastpost',
        direction: 'DESC'
    }]
});
