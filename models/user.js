const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Users = sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Users;