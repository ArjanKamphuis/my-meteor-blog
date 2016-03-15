if (Meteor.isClient) {
    Session.setDefault('lazyloadLimit', 2);
}

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    onAfterAction: function() {
        var data = Posts.findOne({ slug: this.params.slug });
        if (_.isObject(data) && !_.isArray(data)) {
            document.title = 'My Meteor Blog - ' + data.title;
        } else {
            document.title = 'My Meteor Blog - ' + this.route.getName();
        }
    }
});

PostController = RouteController.extend({
    waitOn: function() {
        return Meteor.subscribe('single-post', this.params.slug);
    },
    data: function() {
        return Posts.findOne({ slug: this.params.slug });
    }
});

// deprecated Router.map way
// Use Router.route instead
/*Router.map(function() {
    this.route('Home', {
        path: '/',
        template: 'home',
        subscriptions: function() {
            return Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));
        }
    });
    this.route('About', {
        path: '/about',
        template: 'about'
    });
    this.route('Post', {
        path: '/posts/:slug',
        template: 'post',
        controller: 'PostController'
    });
    this.route('Create Post', {
        path: '/create-post',
        template: 'editPost'
    });
    this.route('Edit Post', {
        path: '/edit-post/:slug',
        template: 'edit-post',
        controller: 'PostController'
    });
});*/

Router.route('/', {
    name: 'Home',
    template: 'home',
    subscriptions: function() {
        return Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));
    }
});
Router.route('/about', {
    name: 'About',
    template: 'about'
});
Router.route('/posts/:slug', {
    name: 'Post',
    template: 'post',
    controller: 'PostController'
});
Router.route('/create-post', {
    name: 'Create Post',
    template: 'edit-post'
});
Router.route('/edit-post/:slug', {
    name: 'Edit Post',
    template: 'edit-post',
    controller: 'PostController'
});

var requiresLogin = function() {
    if (!Meteor.user() || !Meteor.user().roles || !Meteor.user().roles.admin) {
        this.render('notFound');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requiresLogin, { only: ['Create Post', 'Edit Post'] });