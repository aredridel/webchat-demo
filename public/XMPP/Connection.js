define(['backbone', 'underscore', 'jquery', 'strophe', 'XMPP/Conversation', 'XMPP/Presence', 'XMPP/RosterItem'], function(Backbone, _, $, _strophe, Conversation, Presence, RosterItem) {
    /*globals Strophe:false $pres:false $iq:false */
    "use strict";
    var Connection = function Connection(options) {
        this.conversations = {};
        this.initialize.apply(this, arguments);
    };

    _.extend(Connection.prototype, Backbone.Events, {
        initialize: function () {
            _.bindAll(this);
            this.roster = new Backbone.Collection();
        },

        login: function(jid, password) {
            this.xmpp = new Strophe.Connection("/http-bind");
            this.xmpp.connect(jid, password, this._handleConnection);
        },

        _handleMessage: function handleMessage (message) {
            var from = message.getAttribute('from');
            this.startConversation(from);
            this.trigger('message message:'+message.getAttribute('type') + ' message(' + message.getAttribute('from') + ')', message);
            return true;
        },

        startConversation: function startConversation(from) {
            if (!this.conversations[from]) {
                this.conversations[from] = new Conversation({connection: this, jid: from});
                this.trigger('conversation', this.conversations[from]);
            }
            this.conversations[from].trigger('activity');
            return this.conversations[from];
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
        },

        unsubscribed: function sendUnsubscribed(jid) {
            this.xmpp.send($pres({to: jid, type: 'unsubscribed'}));
        },
        subscribed: function sendUnsubscribed(jid) {
            this.xmpp.send($pres({to: jid, type: 'subscribed'}));
        },
        unsubscribe: function sendUnsubscribed(jid) {
            this.xmpp.send($pres({to: jid, type: 'unsubscribe'}));
        },
        subscribe: function sendUnsubscribed(jid) {
            this.xmpp.send($pres({to: jid, type: 'subscribe'}));
        },
        getRoster: function getRoster(options) {
            if (!options) options = {timeout: 120};
            var roster = this.roster;
            this.xmpp.sendIQ($iq({type: 'get'}).c("query", {"xmlns": Strophe.NS.ROSTER}),
                function(result) {
                    var results = [];
                    $(result).find('item').each(function() {
                        results.push(new RosterItem({
                            jid: this.getAttribute('jid'),
                            subscription: this.getAttribute('subscription')
                        }));
                    });
                    roster.reset(results);
                    if (options.success) options.success(roster);
                },
                function(err) {
                    if (!err) err = 'timeout';
                    if (options.error) options.error(err);
                }
            );
        }

    });

    Connection.extend = Backbone.View.extend;

    return Connection;

});
