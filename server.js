//MAIN MVC Tech Blog Server 

//Path Module
const path = require('path');
//sensitive configuration - DB USER, DB PW
require('dotenv').config();
//Express.js server 
const express = require('express');
//all routes defined in the controllers folder
const routes = require('./controllers/');
//sequelize connection server to database
const sequelize = require('./config/connection');
//handlebars template engine for front-end 
const exphbs = require('express-handlebars');

//initialize handlebars for the html template
const hbs = exphbs.create({});

//initialize the server 
const app = express();
//Define the port for the server 
const PORT = process.env.PORT || 3002;
//give the server a path to the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Set handlebars as the template engine for the server 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Have express parse JSON and string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Give the server the path to the routes 
app.use(routes);

//Turn on the connection to db and to the server 
//force: true to reset the database and clear all values, updating any new relationships 
//Force: false to maintain data/normal operation 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!'));
});