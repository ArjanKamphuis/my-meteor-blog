Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Posts.allow({
        insert: function(userId, doc) {
            return userId && doc.owner === userId && Meteor.user().roles.admin;
        },
        update: function(userId, doc, fields, modifier) {
            return Meteor.user().roles.admin;
        },
        fetch: ['owner']
    });
    
    Posts.deny({
        update: function(userId, doc, fields, modifier) {
            return _.contains(fields, 'owner') || _.contains(fields, 'timeCreated') ||
                _.contains(fields, 'slug');
        }
    });
}