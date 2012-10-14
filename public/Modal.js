define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        render: function() {
            this.setElement(this.template(this.templateData()));

            return this.$el;
        },
        events: {
            'click [data-command]': function(ev) {
                var command = ev.target.getAttribute('data-command');
                if (this.commands[command]) {
                    this.commands[command].apply(this, ev);
                }
            }
        },
        commands: {
        },
        templateData: function() {
            return this.options;
        }
    });
});
