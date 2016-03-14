Template.home.helpers({
    postsList: function() {
        return [
            {
                title: 'My Second Entry',
                description: 'Borem sodum color sit amet, consetetur sadipscing elitr.',
                author: 'Fabian Vogelsteller',
                timeCreated: moment().subtract(3, 'days').unix()
            },
            {
                title: 'My First Entry',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
                author: 'Fabian Vogelsteller',
                timeCreated: moment().subtract(7, 'days').unix()
            }
        ];
    }
});