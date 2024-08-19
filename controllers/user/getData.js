const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const { Op } = require("sequelize");

module.exports.getData = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;
  let data = req.body;
  let walletId = data.user;

  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser && !walletId) {
    try {
      let user = await User.findOne({ where: { email: loggedUserEmail } });

      if (user) {
        res.status(200).json(user.dataValues);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  } else if (loggedUser && walletId) {
    try {
      let user = await User.findOne({ where: { walletId: walletId } });

      if (user) {
        res.status(200).json(user.dataValues);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  }
	else {
    res.status(500).json("The token is not valid");
  }
};
