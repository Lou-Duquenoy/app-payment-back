const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const { ethers } = require("ethers");
const genericErc20Abi = require("./ERC20.json");
const tokenContractAddress = "0x1E16D4579D6a1471745a20eC491739e201971151";
//console.log(genericErc20Abi)


module.exports.getBSCBalance = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;
  let BSCWallet = req.body.BSCWallet;

	let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });
	
	if (loggedUser) {
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed4.binance.org"
);
const contract = new ethers.Contract(
  tokenContractAddress,
  genericErc20Abi,
  provider
);

async function getBalances(BSCWallet) {
  const rawBalance = await contract.balanceOf(BSCWallet);
  let balance = ethers.utils.formatEther(rawBalance.toString());
  console.log(balance);
	
	let roundedBalance = Math.round(balance * 100) / 100;
	let finalBalance = roundedBalance.toString().replace('.', ',');
	res.status(200).json(finalBalance);
}

getBalances(BSCWallet);
	}
	
	else {
		res.status(404).json("User not found");
	}
}