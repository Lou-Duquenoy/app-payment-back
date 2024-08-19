const User = require("../../models/User");
const jwt_decode = require("jwt-decode");

module.exports.update = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;

  let newUserData = req.body.newUserData;

  try {
    let user = await User.findOne({ where: { email: loggedUserEmail } });
    // Check if record exists in db

    if (user) {
      if (newUserData.picture != user.avatar && newUserData.picture != "") {
        user.update({
          avatar: newUserData.picture,
        });
      }

      if (newUserData.city != user.city && newUserData.city != "") {
        user.update({
          city: newUserData.city,
        });
      }

      if (newUserData.activity != user.activity && newUserData.activity != "") {
        user.update({
          activity: newUserData.activity,
        });
      }
		
	if (newUserData.BSCWallet != user.BSCWallet && newUserData.BSCWallet != "") {
        user.update({
          BSCWallet: newUserData.BSCWallet,
        });
      }

      if (newUserData.email != user.email && newUserData.email != "") {
        user.update({
          email: newUserData.email,
        });
      }

      if (
        newUserData.phoneNumber != user.phoneNumber &&
        newUserData.phoneNumber != ""
      ) {
        user.update({
          phoneNumber: newUserData.phoneNumber,
        });
      }

      res.status(200).json("Informations mises à jour");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
