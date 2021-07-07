const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "TEXT is also another datatypes that is commonly used as well.",
        post_id: 1,
        user_id: 4
    },
    {
        comment_text: "So thats how passwords are protected! ",
        post_id: 5,
        user_id: 1
    },
    {
        comment_text: "Wow! Didn't know about handlebars! ",
        post_id: 3,
        user_id: 2
    },
    {
        comment_text: "Great Session! ",
        post_id: 4,
        user_id: 3
    },
];
 
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;