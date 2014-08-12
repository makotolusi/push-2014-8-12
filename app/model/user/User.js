/**
 * This view is used to present the details of a single Ticket.
 */
Ext.define('Push.model.user.User', {
    extend: 'Push.model.Base',

    fields: [
        'name'
    ],

    manyToMany: 'Group'
});
