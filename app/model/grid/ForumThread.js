Ext.define('Push.model.grid.ForumThread', {
    extend: 'Push.model.Base',
    fields: [
        'title', 'forumid', 'username',
        {name: 'replycount', type: 'int'},
        {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
        'lastposter', 'excerpt', 'threadid'
    ],
    idProperty: 'threadid'
   
});
