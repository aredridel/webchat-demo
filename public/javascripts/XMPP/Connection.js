define(['backbone', 'underscore', 'strophe', 'javascripts/XMPP/Conversation'], function(Backbone, _, _strophe, Conversation) {
    /*globals Strophe:false $pres:false */
    "use strict";
    var Connection = function Connection(options) {
        this.conversations = {};
        this.initialize.apply(this, arguments);
    };

    _.extend(Connection.prototype, Backbone.Events, {
        initialize: function () {
            _.bindAll(this);
        },

        login: function(jid, password) {
            this.xmpp = new Strophe.Connection("/http-bind");
            this.xmpp.connect(jid, password, this._handleConnection);
        },

        _handleMessage: function handleMessage (message) {
            this.trigger('message message:'+message.getAttribute('type'), message);
            var from = message.getAttribute('from');
            if (!this.conversations[from]) {
                this.conversations[from] = new Conversation({connection: this, jid: from});
                this.trigger('conversation', this.conversations[from]);
            }
            return true;
        },

        _handleConnection: function handleConnection (status) {
            this.trigger('status', status);
            if (status === Strophe.Status.CONNECTED) {
                this.trigger('connected');
                this.xmpp.addHandler(this._handleMessage, null, "message");
                this.xmpp.send($pres());
            } else if (status === Strophe.Status.DISCONNECTED) {
                this.trigger('disconnected');
            }
        }

    });

    Connection.extend = Backbone.View.extend;

    return Connection;

});
