const { Post } = require('../models');

const postData = [
    {
        title: "Sequelize: Model Basics",
        post_text: "Model is an abstract that represents a table in the database. In sequelize it is a class that extends Model. The Model tells Sequelize several things that it represents, such as the name of the table, and which columns it has and what their datatypes it is. ",
        user_id: 1,
    },
    {
        title: "Sequelize: DataTypes",
        post_text: "Sequelize has a handful of built in datatypes that you can use to define your model. The most commonly used for some basic databases are INTEGER and STRING.",
        user_id: 1,
    },
    {
        title: "Handlebars",
        post_text: "Handlebars is a simple templating engine. It uses a template to generate HTML web page.",
        user_id: 2,
    },
    {
        title: "Sessions",
        post_text: "Sessions is when user logs in, a session is established using npm package such as express-session, then a cookie will be saved on the computer authenticating them on the website.",
        user_id: 3,
    },
    {
        title: "Password: Hashing",
        post_text: "Hashing is an important part of user authentication. When an user creates a password it needs to be protected since its a sensitive information. To do this we use a npm package called bcrypt.",
        user_id: 4,
    },
];
 const seedPosts = () => Post.bulkCreate(postData);
  
 module.exports = seedPosts;