const Sequelize = require("sequelize");
const connexion = require("../database");


const TextOfOzalentour = connexion.define(
  "TextOfOzalentours",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    emplacement: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    type: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    textefr: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    texten: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);



module.exports = TextOfOzalentour;
