const { send } = require("express/lib/response");
const Sequelize = require("sequelize");
const connexion = require("../database");

const Roles = connexion.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
  });

  //Roles.sync({});
  module.exports = Roles;