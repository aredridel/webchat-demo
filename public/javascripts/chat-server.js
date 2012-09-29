require(['backbone', 'underscore', 'jquery', "strophe", 'javascripts/XMPP/Connection'], function(Backbone, _, $, _strophe, Connection) {
    /*jshint browser:true*/
    /*global Strophe:false, $pres:false, console:false */
    "use strict";

    var ChatBar = Backbone.View.extend({
        initialize: function () {
            var conn = this.connection = new Connection();
            conn.login('test@localhost/strophe', 'test');
            conn.on('connected', function() {
                console.log('connected');
            });
            conn.on('disconnected', function() {
                console.log('disconnected');
            });
            conn.on('message:chat', function(message) {
                console.log(message);
            });
        }
    });

    var Conversation = Backbone.View.extend({
    });

    var chatBar = new ChatBar({el: $('[data-provide=chat]')});



});
