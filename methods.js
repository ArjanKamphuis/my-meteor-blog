Meteor.methods({
    insertPost: function(postDocument) {
        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');
        } else {
            var user = Meteor.user();
            if (!user) {
                throw new Meteor.Error(401, 'You need to login to write a post');
            }
            if (Posts.findOne({ slug: postDocument.slug })) {
                postDocument.slug = postDocument.slug + '-' + Math.random().toString(36).substring(3);
            }
            postDocument.timeCreated = moment().unix();
            postDocument.author = user.profile.name;
            postDocument.owner = user._id;
            Posts.insert(postDocument);
            return postDocument.slug;
        }
    }
});