const Sequelize = require("sequelize");
const connexion = require("../database");
const TeamOzalentour = require("./TeamOzalentour");

const Departments = connexion.define("Departments", {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  

  Departments.sync({alter:true});
  
  module.exports = Departments;
  