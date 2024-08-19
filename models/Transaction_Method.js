const Sequelize = require("sequelize");
const connexion = require("../database");

const Transaction_Method = connexion.define(
  "Transactions_Methods",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // Method of payment in case of account reload (credit card, crypto, bank transfer ...)
    method: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
    timestamps: false,
  }
);

module.exports = Transaction_Method;
