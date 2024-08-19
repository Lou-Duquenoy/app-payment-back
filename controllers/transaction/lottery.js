const stellarTransaction = require("../../services/blockchain/stellarTransaction");
const saveTransaction = require("../../services/saveTransaction");

module.exports.lottery = (req, res) => {
  let transactionData = req.body;
  console.log("Roger ici le body de la req", dataTransaction);

  try {
    let stellarDestinationKey = transactionData.stellarDestinationKey;
    let stellarAmount = transactionData.amount.toString();

    stellarTransaction(stellarDestinationKey, stellarAmount).then((result) => {
      console.log("RETOUR DE STELLAR", result);

      saveTransaction(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
