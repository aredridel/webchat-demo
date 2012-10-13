define(['backbone', 'underscore', 'strophe', 'XMPP/Conversation', 'XMPP/Presence'], function(Backbone, _, _strophe, Conversation, Presence) {
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
            var from = message.getAttribute('from');
            if (!this.conversations[from]) {
                this.conversations[from] = new Conversation({connection: this, jid: from});
                this.trigger('conversation', this.conversations[from]);
            }
            this.trigger('message message:'+message.getAttribute('type') + ' message(' + message.getAttribute('from') + ')', message);
            return true;
        },

        _handleConnection: function handleConnection (status) {
            this.trigger('status', status);
            if (status === Strophe.Status.CONNECTED) {
                this.trigger('connected');
                this.xmpp.addHandler(this._handleMessage, null, "message");
                this.xmpp.addHandler(this._handlePresence, null, "presence");
                this.xmpp.send($pres());
            } else if (status === Strophe.Status.DISCONNECTED) {
                this.trigger('disconnected');
            }
        },

        _handlePresence: function handlePresence(el) {
            var presence = new Presence({el: el, connection: this});
            this.trigger("presence presence:" +presence.type, presence);
        }

    });

    Connection.extend = Backbone.View.extend;

    return Connection;

});
