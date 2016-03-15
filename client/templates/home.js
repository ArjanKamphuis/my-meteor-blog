Template.home.helpers({
    postsList: function() {
        return Posts.find({}, { sort: { timeCreated: -1 } });
    },
    sessionExample: function() {
        return Session.get('mySessionExample');
    }
});

Template.home.events({
    'click button.lazyload': function(e, template) {
        var currentLimit = Session.get('lazyloadLimit');
        Session.set('lazyloadLimit', currentLimit + 2);
    }
});

Template.home.created = function() {
    this.autorun(function() {
        alert(Session.get('mySessionExample'));
    });
};