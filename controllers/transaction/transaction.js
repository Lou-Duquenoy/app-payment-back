const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const Audit_Transaction_History = require("../../models/Audit_Transaction_History");
const Transaction_History = require("../../models/Transaction_History");

module.exports.transaction = async (req, res) => {
    let token = req.body.token;
  let decoded = jwt_decode(token); 
  let loggedUserEmail = decoded.email;
  
  
  // We check if the user has a valid token to let him make a transaction
  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });
  console.log(loggedUser);
  if  (loggedUser) {
    try  {
      let transactionData = req.body.data;

      // We convert the amount to a float number with 2 decimals
      let rawAmount = parseFloat(transactionData.amount.replace(/,/g, "."));

      let amount = Math.round(rawAmount * 100) / 100;

      // We calculate the fees amount based on the transaction amount and convert them to a float number with 2 decimals

      let rawFees = (amount * 0.99) / 100;

      let fees = Math.round(rawFees * 100) / 100;

      // We search for the sender data and the receiver data in the database

      const sender = await User.findOne({
        where: { walletId: transactionData.senderWalletId },
      })
	  .catch((err) => {
        console.log(err);
      });

      console.log(sender);
      const receiver = await User.findOne({
        where: { walletId: transactionData.receiverWalletId },
      }) 
	  .catch((err) => {
        console.log(err);
      });
	    console.log(receiver);

      if (sender && typeof sender.EUR !== 'undefined' && sender.EUR >= amount) {
        console.log("c'est parti Michel !");
          let senderEUR;
          let receiverEUR;
		  
          // We calculate the new users OZP wallet amounts
          let oldSenderEURFloat = parseFloat(sender.EUR.replace(/,/g, "."));

          let oldSenderEUR = Math.round(oldSenderEURFloat * 100) / 100;

          let oldReceiverEURFloat = parseFloat(
            receiver.EUR.replace(/,/g, ".")
            ).toFixed(2);

          let oldReceiverEUR =
            Math.round(oldReceiverEURFloat * 100) / 100;

            if (transactionData.feesGoTo == "sender") {
              senderEUR = Math.round((oldSenderEUR - (amount + fees)) * 100) / 100;

              sender.update({ EUR: senderEUR });

              receiverEUR = Math.round((oldReceiverEUR + amount) *100) /100;

              receiver.update({ EUR: receiverEUR });

              transactionData.amount = amount;
              transactionData.fees = fees;
              transactionData.total = amount + fees;
				      transactionData.feesGoTo = "sender";
              } else if (transactionData.feesGoTo == "receiver") {
                senderEUR = Math.round((oldSenderEUR - amount) *100) /100;

                sender.update({ EUR: senderEUR });

                receiverEUR =
                  Math.round((oldReceiverEUR + (amount - fees)) * 100) / 100;
                receiver.update({ EUR: receiverEUR });
				  
				        transactionData.amount = amount;
                transactionData.fees = fees;
                transactionData.total = amount + fees;
				        transactionData.feesGoTo = "receiver";
              };
              // We save the transaction data in the database
              let saveTransaction = await Transaction_History.create(
                transactionData
              );
              
              if (saveTransaction) {
                res.json({ message: "La transaaction est enregistrée" });
              }
              // We save the monitoring transaction data
              let transactionMonitoring = {
                transactionId: saveTransaction.id,
                userSender: saveTransaction.senderWalletId,
                userReceiver: saveTransaction.receiverWalletId,
                oldEUR: {
                  senderEUR: oldSenderEUR,
                  receiverEUR: oldReceiverEUR,
                },
                newEUR: { senderEUR: senderEUR, receiverEUR: receiverEUR },
              };

              let audit = await Audit_Transaction_History.create(
                transactionMonitoring
              );
            } 
       else {
        res.status(202).json("Votre solde est insuffisant");
        console.log("Votre solde est insuffisant");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};

