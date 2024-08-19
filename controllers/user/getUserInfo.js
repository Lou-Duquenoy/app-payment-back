const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const { Op } = require("sequelize");

module.exports.getUserInfo = async (req, res) => {
  console.log("You're in the login endpoint.");

  try {
    // Extract email and password from the request body
	let token = req.body.token;
    let decoded = jwt_decode(token);
    let loggedUserEmail = decoded.email;
    

    // Search for the user with the provided email in the database
    const userData = await User.findOne({
      where: { email: loggedUserEmail }
    });

    // Check if the user exists
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const { firstAddress, denomination, siret } = userData;
    res.status(200).json({ firstAddress, denomination, siret });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};