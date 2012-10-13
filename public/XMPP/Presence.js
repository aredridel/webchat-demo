define(['backbone', 'underscore'], function(Backbone, _) {
    function Presence(options) {
        this.type = options.el.getAttribute('type');
        this.from = options.el.getAttribute('from');
        this.to = options.el.getAttribute('to');
        this.connection = options.connection;
        this.initialize.apply(this, arguments);
    }

    _.extend(Presence.prototype, Backbone.Events, {
        initialize: function() {
        }
    });

    return Presence;
});
