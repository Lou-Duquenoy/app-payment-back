const Sequelize = require("sequelize");
const connexion = require("../database");

const Reset_Password = connexion.define("Reset_Passwords", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.Sequelize.DATE(6),
    allowNull: false,
  },
});

module.exports = Reset_Password;
