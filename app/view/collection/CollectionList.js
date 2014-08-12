/**
 * This example demonstrates using a paging display.
 */
Ext.define('Push.view.collection.CollectionList', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Push.model.grid.ForumThread'
    ],
    xtype: 'collection-list-grid',

    //<example>
    exampleTitle: '应用列表',
    otherContent: [{
        type: 'Store',
        path: 'app/store/ForumThreads.js'
    },{
        type: 'Model',
        path: 'app/model/grid/ForumThread.js'
    }],
    themes: {
        classic: {
            width: 1000,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            width: 1000,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>

    height: 700,
    width: 1850,
    frame: true,
    title: '应用列表',
    disableSelection: true,
    loadMask: true,

    initComponent: function(){
    	var states = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"AL", "name":"IOS"},
        {"abbr":"AK", "name":"ANDROID"}
        //...
    ]
});

// Create the combo box, attached to the states data store
var combo=Ext.create('Ext.form.ComboBox', {
    fieldLabel: '客户端',
    store: states,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'abbr',
    renderTo: Ext.getBody()
});
        // this.width = this.themeInfo.width;
        var pluginExpanded = false;

        // create the Data Store
        var store = Ext.create('Push.store.ForumThreads');
        store.proxy.extraParams = {active: '1'};
		// store.load({
		    // params: {
		        // group: 3,
		        // type: 'user'
		    // },
		    // callback: function(records, operation, success) {
		        // // do something after the load finishes
		    // },
		    // scope: this
		// });
        Ext.apply(this, {
            store: store,
            viewConfig: {
                id: 'gv',
                trackOver: false,
                stripeRows: false
                // plugins: [{
                    // ptype: 'preview',
                    // bodyField: 'excerpt',
                    // expanded: pluginExpanded,
                    // pluginId: 'preview'
                // }]
            },
            // grid columns
            columns:[{
                text: "推送ID",
                dataIndex: 'username',
                width: 100,
                hidden: false,
                sortable: true
            },{
                // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
                // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
                // therefore the id will be registered in the ComponentManager and conflict. Need a way to
                // add additional CSS classes to the rendered cells.
                text: "标题",
                dataIndex: 'title',
                flex:1,
                // renderer: this.renderTopic,
                sortable: false
            },{
                text: "用户群",
                dataIndex: 'username',
                width: 150,
                hidden: false,
                sortable: true
            },{
                text: "SecretKey_android",
                dataIndex: 'replycount',
                width:150,
                align: 'right',
                sortable: true
            },{
                text: "AppKey_ios",
                dataIndex: 'lastpost',
                width: 150,
                // renderer: this.renderLast,
                sortable: true
            },{
                text: "SecretKey_ios",
                dataIndex: 'lastpost',
                width: 150,
                // renderer: this.renderLast,
                sortable: true
            },   {
                menuDisabled: true,
                  text: "进入",
                sortable: false,
                xtype: 'actioncolumn',
                width: 100,
                items: [{
                    iconCls: 'application-go',
                    id: 'enter',
                    tooltip: '进入',
                         handler: function(grid, rowIndex, colIndex) {
                         	var g = Push.getApplication().getController('Root');
                         	g.onEnterApp({a:'1'});
                    }
                }]
            }
            ],
            // inline buttons
            
            // paging bar on the bottom
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store,
                // displayInfo: false,
                // displayMsg: 'Displaying topics {0} - {1} of {2}',
                // emptyMsg: "No topics to display",
                items:[
                    '-'
                    // , {
                    // text: pluginExpanded ? 'Hide Preview' : 'Show Preview',
                    // pressed: pluginExpanded,
                    // enableToggle: true,
                    // toggleHandler: function(btn, pressed) {
                        // var preview = Ext.getCmp('gv').getPlugin('preview');
                        // preview.toggleExpanded(pressed);
                        // btn.setText(pressed ? 'Hide Preview' : 'Show Preview');
                    // }
                // }
                ]
            })
        });
        this.callParent();
    },

    afterRender: function(){
        this.callParent(arguments);
        this.getStore().loadPage(1);
    },

    renderTopic: function(value, p, model) {
        return Ext.String.format(
            '<b><a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a></b> <a href="http://sencha.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',
            value,
            model.get('forumtitle'),
            model.getId(),
            model.get('forumid')
        );
    },

    renderLast: function(value, p, model) {
        return Ext.String.format('{0}<br/>by {1}', Ext.Date.dateFormat(value, 'M j, Y, g:i a'), model.get('lastposter'));
    }
});
