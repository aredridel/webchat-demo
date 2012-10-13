define(['backbone', 'underscore'], function(Backbone, _) {
    /*jshint browser:true */
    /*global $msg:false */
    "use strict";
    var Conversation = function Conversation(options) {
        this.options = options || {};
        this.connection = this.options.connection;
        this.jid = this.options.jid;
        this.connection.on('message(' + options.jid + ')', this._handleMessage, this);
        this.connection.on('disconnected', this._handleDisconnect, this);
        this.initialize.apply(this, arguments);
    };

    _.extend(Conversation.prototype, Backbone.Events, {
        initialize: function () {
        },

        _handleMessage: function (message) {
            this.trigger('message', message);
            return true;
        },

        _handleDisconnect: function () {
            this.trigger('disconnected');
        },
        
        send: function(message) {
            var m = $msg({type: 'chat', to: this.jid}).c('body').t(message);
            this.trigger('message', m.tree());
            this.connection.xmpp.send(m);
        }
    });

    return Conversation;
});
