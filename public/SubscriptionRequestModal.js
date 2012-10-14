define(['underscore', 'Modal', 'text!SubscriptionRequestModal.us'], function(_, Modal, templateText) {
    "use strict";

    return Modal.extend({
        template: _.template(templateText),
        commands: {
            "deny": function() {
                console.log("Deny");
            },
        }
    });
});
