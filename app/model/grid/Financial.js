Ext.define('Push.model.grid.Financial', {
    extend: 'Push.model.Base',
    fields: [
        {name: 'company'},
        {name: 'price', type: 'float'},
        {name: 'change', type: 'float'},
        {name: 'pctChange', type: 'float'},
        {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},
        {name: 'industry'},
        {name: 'desc'}
     ]
});
