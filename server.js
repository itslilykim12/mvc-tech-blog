const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

//initialize the server 
const app = express();
//Define the port for the server 
const PORT = process.env.PORT || 3001;

//Have express parse JSON and string data
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//Give the server the path to the routes 
//app.use(routes);

//Turn on the connection to db and to the server 
//force: true to reset the database and clear all values, updating any new relationships 
//Force: false to maintain data/normal operation 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!'));
});