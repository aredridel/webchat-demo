define(['backbone', 'Conversation'], function(Backbone, Conversation) {
    "use strict";
    return Backbone.View.extend({
        initialize: function (options) {
            var conn = this.connection = options.connection;

            conn.on('conversation', this.handleChat, this);
        },
        
        handleChat: function (conversation) {
            var v = new Conversation({conversation: conversation});
            this.$el.append(v.render());
        }
    });
});
