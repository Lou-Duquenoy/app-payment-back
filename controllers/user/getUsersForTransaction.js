const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const Transaction_History = require("../../models/Transaction_History");
const { Op } = require("sequelize");

exports.getUsersForTransaction = async (req, res) => {
  try {
    if (!req.body.senderWalletId) {
      return res.status(400).json({
        message: "Sender WalletId is required",
      });
    }
    const transactionHistory = await Transaction_History.findAll({
      where: {
        userSender: req.body.senderWalletId,
      },
     
    });
    console.log(transactionHistory);
    return res.status(200).json({
      transactionHistory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
