const User = require("../../models/User");
const jwt_decode = require("jwt-decode");

module.exports.destroy = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;

  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser) {
    let deletedUser = await User.destroy({ where: { email: loggedUserEmail } });

    if (deletedUser) {
      res.status(200).json("The user have been deleted");
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};
