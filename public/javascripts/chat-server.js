require(['backbone', 'underscore', 'jquery', "strophe", 'javascripts/XMPP/Connection'], function(Backbone, _, $, _strophe, Connection) {
    /*jshint browser:true*/
    /*global Strophe:false, $pres:false, console:false */
    "use strict";

    var ChatBar = Backbone.View.extend({
        initialize: function (options) {
            var conn = this.connection = options.connection;

            conn.on('conversation', this.handleChat, this);
        },
        
        handleChat: function (conversation) {
            var v = new Conversation({conversation: conversation});
            this.$el.append(v.render());
        }
    });

    var Conversation = Backbone.View.extend({
        initialize: function() {
             this.conversation = this.options.conversation; 
             this.conversation.on('message', this.handleMessage, this);
        },
        render: function () {
            this.$el.addClass('conversation');
            this.$el.append("<div>" + this.conversation.jid + "</div>");
            return this.$el;
        },
        handleMessage: function (message) {
            var el = $('<div>');
            el.text($(message).find('body').text());
            this.$el.append(el);
        }
    });

    var conn = new Connection();
    var chatBar = new ChatBar({el: $('[data-provide=chat]'), connection: conn});
    conn.login('test@localhost/strophe', 'test');

});
