define(['backbone', 'underscore'], function(Backbone, _) {
    return Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this);
            this.connection = options.connection;
            this.collection.on('reset', this.render);
            this.collection.on('add', this.render);
        },
        render: function() {
            this.$el.addClass('Roster');
            this.collection.each(this.renderItem);
        },
        renderItem: function(item) {
            console.log(item);
            this.$el.append($("<div>").attr('data-jid', item.get('jid')).addClass('RosterItem').text(item.get('jid')));
        },
        events: {
            'click .RosterItem': function (ev) {
                this.connection.startConversation(ev.target.getAttribute('data-jid'));
            }
        }
    });
});
