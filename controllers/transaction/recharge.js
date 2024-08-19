const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const saveTransaction = require("../../services/saveTransaction");

module.exports.recharge = async (req, res) => {
  rechargeData = req.body.data;
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;

  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser) {
    try {
      stellarTransaction(rechargeData.stellarReceiverKey, rechargeData.amount)
        .then((result) => {
          saveTransaction(result);
        })

        .then(async function () {
          let userPublicKey = stellarDestinationKey;

          console.log(" je choppe la clef", userPublicKey);
          const user = await User.findOne({
            where: { publicKey: userPublicKey },
          });

          if (user) {
            console.log("Hey mon chum chui le user", user);
            let totalEUR = user.EUR + parseInt(req.body.amount);
            const userTotalEUR = await user
              .update({ EUR: totalEUR })
              .then(() => {
                res.status(200).json("User EUR updated");
              })
              .catch(function (error) {
                console.error("Something went wrong!", error);
              });
          } else {
            res.status(404).json("User not found");
          }
        });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};
