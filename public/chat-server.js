require(['jquery', 'XMPP/Connection', 'SubscriptionRequestModal', 'ChatBar', 'Conversation', 'Roster'], function($, Connection, SubscriptionRequestModal, ChatBar, Conversation, Roster) {
    /*jshint browser:true*/
    /*global console:false */
    "use strict";

    var conn = new Connection();
    var chatBar = new ChatBar({el: $('[data-provide=chat]'), connection: conn});
    conn.on('presence:subscribe', function(pres) {
        console.log(pres);
        $('body').append((new SubscriptionRequestModal({presence: pres, connection: conn})).render());
    });
    conn.login('test@localhost/' + Math.random(), 'test');
    conn.on('connected', function() {
        conn.getRoster();
    });

    var roster = new Roster({collection: conn.roster, connection: conn});
    conn.roster.on('reset', function() { console.log('reset'); });
    $('body').append(roster.el);
});
