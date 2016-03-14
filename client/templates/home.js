Template.home.helpers({
    postsList: function() {
        return Posts.find({}, { sort: { timeCreated: -1 } });
    }
});