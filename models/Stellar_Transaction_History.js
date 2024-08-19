const { symlinkSync } = require("fs");
const Sequelize = require("sequelize");
const connexion = require("../database");

const Stellar_Transaction_History = connexion.define(
  "Stellar_Transactions_History",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // The id of the Stellar transaction
    stellarId: {
      unique: true,
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    pagingToken: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },

    successful: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    hash: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    ledger: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    sourceAccount: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    sourceAccountSequence: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    feeAccount: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    feeCharged: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    maxFee: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    operationCount: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    signatures: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    envelopeXdr: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
    timestamps: false,
  }
);


module.exports = Stellar_Transaction_History;
