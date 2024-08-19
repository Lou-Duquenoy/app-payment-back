const Sequelize = require("sequelize");
const connexion = require("../database");

const Transaction_Type = connexion.define(
  "Transactions_Types",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // Type of transaction (account reload, transfer, switch ...)
    type: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
    timestamps: false,
  }
);


module.exports = Transaction_Type;
