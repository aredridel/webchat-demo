define(['backbone', 'underscore', 'text!LoginModal.us'], function(Backbone, _, TemplateText) {
    var template = _.template(TemplateText);
    return Backbone.View.extend({
        initialize: function(options) {
            this.connection = options.connection;
            this.connection.on('connected', this.close, this);
        },
        render: function(ev) {
            this.$el.append(template());
            return this;
        },
        close: function() {
            this.$el.remove();
        },
        events: {
            'click button': function() {
                this.$('button').addClass('disabled');
                this.connection.login(this.$('[name=jid]').val(), this.$('[name=password]').val());
            }
        }
    });
});
