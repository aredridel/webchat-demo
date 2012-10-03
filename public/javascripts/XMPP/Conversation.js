define(['backbone', 'underscore'], function(Backbone, _) {
    "use strict";
    var Conversation = function Conversation(options) {
        _.bindAll(this);
        this.options = options || {};
        this.connection = this.options.connection;
        this.jid = this.options.jid;
        this.connection.xmpp.addHandler(this._handleMessage, null, 'message', 'chat', null, options.jid);
        this.connection.on('disconnected', this._handleDisconnect);
        this.initialize.apply(this, arguments);
    };

    _.extend(Conversation.prototype, Backbone.Events, {
        initialize: function () {
        },

        _handleMessage: function (message) {
            this.trigger('message', message);
        },

        _handleDisconnect: function () {
            this.trigger('disconnected');
        }
    });

    return Conversation;
});
