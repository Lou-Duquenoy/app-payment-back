const Sequelize = require("sequelize");
const connexion = require("../database");

const Activity_Category = connexion.define(
  "Activity_Categories",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },	
  },
  {
    freezeTableName: true, // add comma here
    timestamps: false,
  }
);


module.exports = Activity_Category;