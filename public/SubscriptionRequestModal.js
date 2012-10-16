define(['underscore', 'Modal', 'text!SubscriptionRequestModal.us'], function(_, Modal, templateText) {
    "use strict";

    return Modal.extend({
        initialize: function(options) {
            this.connection = options.connection;
            this.presence = options.presence;
        },
        template: _.template(templateText),
        commands: {
            "deny": function() {
                this.connection.unsubscribed(this.presence.from);
                this.close();
            },
            "allow": function() {
                this.connection.subscribed(this.presence.from);
                this.close();
            },
            "allow-subscribe": function() {
                this.connection.subscribed(this.presence.from);
                this.connection.subscribe(this.presence.from);
                this.close();
            },
            "ignore": function() {
                this.close();
            }
        }
    });
});
