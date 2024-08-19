const Transaction_History = require("../../models/Transaction_History");
const jwt_decode = require("jwt-decode");
const User = require("../../models/User");
const { Op } = require("sequelize");

module.exports.getTransactionsByUser = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;

  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser) {
    try {
      console.log(req.body);
      let walletId = req.body.walletId;

      console.log(walletId);
      let findTransactions = await Transaction_History.findAll({
        where: {
          [Op.or]: [
            {
              senderWalletId: {
                [Op.eq]: `${walletId}`,
              },
            },
            {
              receiverWalletId: {
                [Op.eq]: `${walletId}`,
              },
            },
          ],
        },
        attributes: [
          "senderWalletId",
          "receiverWalletId",
          "amount",
			"fees",
          "total",
          "currency",
          "description",
          "type",
          "method",
			"feesGoTo",
          "createdAt",
        ],
      })
        .catch((error) => {
          console.error(error);
        })
        .then((response) => {
          console.log(response);
          res.json(response);
        });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};
