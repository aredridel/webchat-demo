require(['jquery', 'XMPP/Connection', 'SubscriptionRequestModal', 'ChatBar', 'Conversation'], function($, Connection, SubscriptionRequestModal, ChatBar, Conversation) {
    /*jshint browser:true*/
    /*global console:false */
    "use strict";

    var conn = new Connection();
    var chatBar = new ChatBar({el: $('[data-provide=chat]'), connection: conn});
    conn.on('presence:subscribe', function(pres) {
        console.log(pres);
        $('body').append((new SubscriptionRequestModal({presence: pres})).render());
    });
    conn.login('test@localhost/' + Math.random(), 'test');

});
