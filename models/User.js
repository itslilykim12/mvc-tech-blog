const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//use bcrypt for password hashing
const bcrypt = require('bcrypt');

//Creating the User Model 
class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

//define the table columns and configuration
User.init(
{ //Table Column Definitions 
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }

},
{
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    //table configuration
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
},
);

module.exports = User;