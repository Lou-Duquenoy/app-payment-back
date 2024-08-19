const User = require("../../models/User");
const {
  stellarTransaction,
} = require("../../services/blockchain/stellarTransaction");
const Transaction_History = require("../../models/Transaction_History");
const BSC_Transaction_History = require("../../models/BSC_Transaction_History");
const { BSCTransaction } = require("../../services/blockchain/BSCTransaction");
const jwt_decode = require("jwt-decode");
const axios = require("axios");

module.exports.convertEURToOZA = async (req, res) => {

  let transactionData = req.body.data;

  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;
  let stellarOZATeamKey = "GB2L5YSZYDIES67WYF5IIRQDHQ7C4YA5L6BRZ2RD3LSABQA5HP5KMMBB";
	
  let user = await User.findOne({ where: { email: loggedUserEmail } });
	
  let stellarSenderKey = user.publicKey;
	
  let fees = Math.round(((transactionData.amount * 0.99) / 100) * 100) / 100;

  let roundAmount = Math.round((parseFloat(transactionData.amount.replace(/,/g, "."))) * 100) / 100;
	
  let stellarAmount = roundAmount.toString();
      
  console.log("swap fees", fees)
  console.log("swap round amount", roundAmount);
  console.log("swap stellar Amount", stellarAmount);
  console.log("C'est parti Michel");

	
  if (user) {
    try {
      stellarTransaction(stellarOZATeamKey, stellarAmount)
		
	    .then( async (response) => {
		  
	         if (response == true) {
		  
	             let transactionData = {
	             "stellarReceiverKey":stellarOZATeamKey,
		         "stellarSenderKey": stellarSenderKey,
		         "amount":roundAmount ,
		         "fees": fees,
		         "total": roundAmount - fees,
		         "feesGoTo": "sender",
		         "currency": "OZP",
		         "description": "conversion OZP to OZA",
		         "type": 3,
		         "method": 1, 
	              }
	  
	             let saveTransaction = await Transaction_History.create(
                 transactionData
                  );
	         }
	     })
		
		.then(() => {
			  
		  let stellarFeesWalletKey = "GDQ3I6USPHSPJQKUTJNMN7SMOBHV4NW2OYTS3YKMRMJBHNRTZOSCJQWZ";
		  
	  stellarTransaction(stellarFeesWalletKey, fees.toString())
		
	    .then( async (response) => {
		  
	         if (response == true) {
		  
	             let transactionData = {
	             "stellarReceiverKey":stellarFeesWalletKey,
		         "stellarSenderKey": stellarOZATeamKey,
		         "amount": fees ,
		         "fees": 0,
		         "total": fees,
		         "feesGoTo": "no fees",
		         "currency": "OZP",
		         "description": "fees transfer",
		         "type": 4,
		         "method": 1, 
	              }
	  
	             let saveTransaction = await Transaction_History.create(
                 transactionData
                  );
	         }
	     })
	  
	  })
	  
	   .then(async () => {
		  
        let EURtoUSD = await axios
          .get(
            "https://exchange-rates.abstractapi.com/v1/live/?api_key=8760271507d04eee868f25cf6cb6c000&base=EUR&target=USD"
          )
          .then((response) => {
            return response.data.exchange_rates.USD;
          });


         let USDTotalAmount = (roundAmount - fees) * EURtoUSD;

         let BSCAmount = USDTotalAmount / 0.01;

         BSCTransaction(transactionData.BSCReceiverKey, BSCAmount)
		  .then(async (response) => {
			console.log("response BSC", response);
			
			   if (response.transactionHash) {
			
			   let oldUserOZPFLoat = parseFloat(user.OZP.replace(/,/g, "."));
				
               console.log("oldUserOZPFLoat", oldUserOZPFLoat);
				
               let roundOldUserOZPFLoat = Math.round(oldUserOZPFLoat * 100) / 100;
				
               let finalUserOZP = roundOldUserOZPFLoat - roundAmount;
               console.log(finalUserOZP);
               user.update({ OZP: finalUserOZP });	
				
				     let BSCTransactionData = {
		         "BSCReceiverKey": transactionData.BSCReceiverKey,
		         "transactionHash":response.transactionHash ,
		         "OZAVersusDollarRate": EURtoUSD,
		         "OZPAmountSent": roundAmount,
		         "OZAAmountReceived": BSCAmount,
		         
		         
	              }
					 
				   let saveBScTransaction = BSC_Transaction_History.create(
					   BSCTransactionData);
				   
			res.status(200).json("BSC transaction success");
			} else {
			res.status(500).json("BSC transaction error");
			}
	            
		})    
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};

module.exports.convertOZPToEUR = (req, res) => {
  console.log(req.body);
};
