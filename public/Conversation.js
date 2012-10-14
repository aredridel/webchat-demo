define(['backbone', 'jquery'], function(Backbone, $) {
    "use strict";
    return Backbone.View.extend({
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
});
