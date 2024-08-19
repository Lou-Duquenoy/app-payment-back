const Sequelize = require("sequelize");
const connexion = require("../database");

const Audit_Transaction_History = connexion.define(
  "Audit_Transactions_History",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    transactionId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    userSender: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    userRecipient: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    oldOZP: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: 0,
      defaultValue: 0,
    },
    newOZP: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: 0,
      defaultValue: 0,
    },
  }
);

module.exports = Audit_Transaction_History;
