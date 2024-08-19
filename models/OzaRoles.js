const { send } = require("express/lib/response");
const Sequelize = require("sequelize");
const connexion = require("../database");

const OzaRoles = connexion.define("OzaRoles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    TeamOzalentourId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  });

 OzaRoles.sync({alter:true});
  module.exports = OzaRoles;