const Sequelize = require("sequelize");
const connexion = require("../database");

const Verification_Key = connexion.define(
  "Verification_Keys",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    key: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    data: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    verified: {
      type: Sequelize.DATE(6),
      defaultValue: null,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);

//Verification_Key.sync({ force: true });
module.exports = Verification_Key;
