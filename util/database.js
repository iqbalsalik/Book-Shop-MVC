const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete","root","syedashu02",{
    dialect:"mysql",
    host: "localhost"
})

module.exports = sequelize;