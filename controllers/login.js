const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../services/jsonWebToken/generator");

module.exports.login = async (req, res) => {
	
	console.log(" t'es dans le login de new api mon chum");
  // We get the email and password data from the front end form
  try {
    const visitorData = req.body.data;
    console.log("loginController visitorData" + visitorData.email);
	  console.log("loginController visitorData" + visitorData.password);

    // We search into the database for a user with an email equal to the one we got in the front end form
    const userData = await User.findOne({
      where: { email: visitorData.email },
    });

    console.log(" loginController userData ", userData.password);
    // We check if the password we get in the front end form matches with the one in databse for this email
    bcrypt.compare(
      visitorData.password,
      userData.password,
      async function (err, result) {
        // If the password is not correct, we return an error message
        if (!result) {
          visitorData.errors = "Email ou mot de passe invalide";
          res.status(403).json(visitorData.errors);
        } else {
          const token = generateToken(
            {
              email: userData.email,
            },
            res
          );
        }
      }
    );
  } catch (err) {
    console.trace(err);
    res.status(500).json("Connexion failed");
  }
};

module.exports.loginTest = async (req, res) => {
  console.log("You are in the loginTest function");

  try {
    const visitorData = req.body.data;
    console.log(visitorData);
    // Find the user in the database
    const userData = await User.findOne({
      where: { email: visitorData.email },
    });

    if (!userData) {
      return res.status(403).json("Email ou mot de passe invalide");
    }

    // Check if the user's password is valid
    const passwordIsValid = await bcrypt.compare(
      visitorData.password,
      userData.password
    );

    if (!passwordIsValid) {
      return res.status(403).json("Email ou mot de passe invalide");
    }

    // Check if the user's first name, last name, and phone number exist in the database
    const userInfo = await User.findOne({
      attributes: ['firstName', 'lastName', 'phoneNumber'],
      where: { id: userData.id }
    });

    let message = "";
    if (!userInfo.firstName) {
      message += "Missing first name. ";
    }
    if (!userInfo.lastName) {
      message += "Missing last name. ";
    }
    if (!userInfo.phoneNumber) {
      message += "Missing phone number. ";
    }

    // Generate token and return user info
    const token = generateToken(
  {
    email: userData.email,
  },
  res,
  userInfo
);

    if (message) {
      res.status(200).json({
        message: message,
        userInfo: userInfo,
      });
    } else {
      res.status(200).json(userInfo);
    }
  } catch (err) {
    console.trace(err);
    res.status(500).json("Connexion failed");
  }
};
