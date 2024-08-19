const Sequelize = require("sequelize");
const connexion = require("../database");

const Transaction_History = connexion.define(
  "Transactions_History",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // In case of transfer between 2 users : public key of the sender | In case of account reload : nothing
    senderWalletId: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },

    // Public key of the recipient
    receiverWalletId: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },

    // Anount of the transaction
    amount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },

    fees: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },

    total: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
	  
	    feesGoTo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // Currency of the transaction
    currency: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },

    // Name of the transaction ("Meal at Pizza hut" ...)
    description: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },

    // Type of transaction (account reload, transfer, switch ...)
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      //references: {
      //  model: TransactionType,
      //  key: "id",
      //},
    },

    // Method of payment in case of account reload (credit card, crypto, bank transfer ...)
    method: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      // references: {
      //   model: TransactionMethod,
      //   key: "id",
      // },
    },

    //  Transaction id of external part (stripe , coinpayment ...) in case of account reload
    externalId: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    //state of transaction id of external part(stripe, coinpayment) in case of account reload
    externalState: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);

Transaction_History.getTransactionpending = async (req, res) => {
  const transacPending = await Transaction_History.findAll({
    where: { stateExternal: "en attente" },
  })
    .then((res) => {
      return res.map((row) => {
        return row.dataValues;
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return transacPending;
};



module.exports = Transaction_History;
