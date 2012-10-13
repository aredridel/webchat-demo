require(['backbone', 'underscore', 'jquery', "strophe", 'XMPP/Connection'], function(Backbone, _, $, _strophe, Connection) {
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
            this.$el.append("<div class='title'>" + this.conversation.jid + "</div>");
            this.$el.append("<div class='inner'><div class='chat'></div></div>");
            this.$el.append('<input type=text>');
            return this.$el;
        },
        handleMessage: function (message) {
            var el = $('<div>');
            if (message.getAttribute('to') == this.conversation.jid) {
                el.addClass('me');
            }
            el.text($(message).find('body').text());
            this.$('.chat').append(el);
        },
        events: {
            'keypress input': function(ev) {
                var $target = $(ev.target);
                if (ev.keyCode != 13 || !$target.val()) return;

                this.conversation.send($target.val());
                $target.val('');
            }
        }
    });

    var conn = new Connection();
    var chatBar = new ChatBar({el: $('[data-provide=chat]'), connection: conn});
    conn.on('presence:subscribe', function(pres) {
        console.log(pres);
    });
    conn.login('test@localhost/' + Math.random(), 'test');

});
