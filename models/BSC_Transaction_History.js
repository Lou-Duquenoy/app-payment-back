const { symlinkSync } = require("fs");
const Sequelize = require("sequelize");
const connexion = require("../database");

const BSC_Transaction_History = connexion.define(
  "BSC_Transactions_History",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    BSCReceiverKey: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    transactionHash: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    OZAVersusDollarRate: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },

    OZPAmountSent: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },

    OZAAmountReceived: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
    timestamps: false,
  }
);

//BSC_Transaction_History.sync();
module.exports = BSC_Transaction_History;
