define(['backbone', 'underscore'], function(Backbone, _) {
    /*jshint browser:true */
    "use strict";
    var Conversation = function Conversation(options) {
        _.bindAll(this);
        this.options = options || {};
        this.connection = this.options.connection;
        this.jid = this.options.jid;
        this.connection.on('message(' + options.jid + ')', this._handleMessage);
        this.connection.on('disconnected', this._handleDisconnect);
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
        }
    });

    return Conversation;
});
