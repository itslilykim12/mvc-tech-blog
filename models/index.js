const User = require('./User');

//User-Post relationship 
User.hasMany(Post, {
    foreignKey: "user_id"
});

module.exports = { User };