require(['jquery', 'XMPP/Connection', 'SubscriptionRequestModal', 'ChatBar', 'Conversation', 'Roster', 'LoginModal'], function($, Connection, SubscriptionRequestModal, ChatBar, Conversation, Roster, LoginModal) {
    /*jshint browser:true*/
    /*global console:false */
    "use strict";

    var conn = new Connection();

    var modal = new LoginModal({connection: conn});
    $('body').append(modal.render().el);

    //conn.login('test@localhost/' + Math.random(), 'test');
    conn.on('connected', function() {
        var chatBar = new ChatBar({el: $('[data-provide=chat]'), connection: conn});
        conn.getRoster();
        conn.on('presence:subscribe', function(pres) {
            console.log(pres);
            $('body').append((new SubscriptionRequestModal({presence: pres, connection: conn})).render());
        });
        var roster = new Roster({collection: conn.roster, connection: conn});
        conn.roster.on('reset', function() { console.log('reset'); });
        $('body').append(roster.el);
    });

});
