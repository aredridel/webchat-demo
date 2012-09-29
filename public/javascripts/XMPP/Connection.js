define(['backbone', 'underscore', 'strophe'], function(Backbone, _, _strophe) {
    /*globals Strophe:false $pres:false */
    "use strict";
    var Connection = function Connection() {
        this.initialize.apply(this, arguments);
    };

    _.extend(Connection.prototype, Backbone.Events, {
        initialize: function () {
            _.bindAll(this);
        },

        login: function(jid, password) {
            this.connection = new Strophe.Connection("/http-bind");
            this.connection.connect(jid, password, this._handleConnection);
        },

        _handleMessage: function handleMessage (message) {
            this.trigger('message message:'+message.getAttribute('type'), message);
            return true;
        },

        _handleConnection: function handleConnection (status) {
            this.trigger('status', status);
            if (status === Strophe.Status.CONNECTED) {
                this.trigger('connected');
                this.connection.addHandler(this._handleMessage, null, "message");
                this.connection.send($pres());
            } else if (status === Strophe.Status.DISCONNECTED) {
                this.trigger('disconnected');
            }
        }

    });

    Connection.extend = Backbone.View.extend;

    return Connection;

});
