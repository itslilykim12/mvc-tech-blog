const { User } = require('../models');

const userData = [
    {
        username: "Lily",
        email: "lily@gmail.com",
        password: "password1234"
    },
    {
        username: "Hannah",
        email: "hannah@gmail.com",
        password: "password1234"
    },
    {
        username: "Rachel",
        email: "rachel@gmail.com",
        password: "password1234"
    },
    {
        username: "Becca",
        email: "becca@gmail.com",
        password: "password1234"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;