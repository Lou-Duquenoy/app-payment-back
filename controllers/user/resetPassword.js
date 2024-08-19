require("dotenv").config();
const User = require("../../models/User");
const Reset_Password = require("../../models/Reset_Password");
const bcrypt = require("bcrypt");
const {
  resetPasswordCode,
} = require("../../services/sendinblue/resetPasswordCode");
const {
  resetPasswordLink,
} = require("../../services/sendinblue/resetPasswordLink");

let charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
/* let password = ""; */

module.exports.sendResetPasswordCode = async (req, res) => {
 try {
    let email = req.body.email;
    let token = "";
    let language = req.body.language;

    console.log("t'es dans le sendResetPasswordCode mon chum !");
    //let language = req.body.language;

    const findUser = await User.findOne({ where: { email: email } }).catch(
      (err) => {
        console.log(err);
      }
    );

    if (!findUser) {
      res.status(404).json("User not found");
    } else {
      // console.log("userController j'ai trouvé le user", findUser);

      // We generate a 16 character token
      for (i = 0; i <= 15; i++) {
        let randomNumber = Math.floor(Math.random() * charset.length);
        token += charset.substring(randomNumber, randomNumber + 1);
      }

      const checkToken = await Reset_Password.findOne({
        where: { userId: findUser.id },
      }).catch((err) => {
        console.log(err);
      });

      if (!checkToken) {
        console.log("email si !checktoken", email);

        userData = {
          userId: findUser.id,
          token: token,
          date: new Date(),
        };
        const tokenData = await Reset_Password.create(userData);
        console.log("email si !checktoken", email);
        //resetPasswordLink(language, email, token);
        resetPasswordCode(language, email, token);
        // We create a new user with all datas we set before

        res.status(200).json("Reset password code has been sent by email");
      } else if (checkToken) {
        console.log("email si checktoken", email);
        token = checkToken.dataValues.token;
        //resetPasswordLink(language, email, token);
        console.log("checkToken result", checkToken);
        resetPasswordCode(language, email, token);
        // We create a new user with all datas we set before

        res.status(200).json("Reset password code has been sent by email");
      } else {
        res
          .status(500)
          .json("Une demande est déjà en cours, vérifiez vos emails");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};


module.exports.sendResetPasswordLink = async (req, res) => {
  try {
    let email = req.body.email;
    let token = "";
    let language = req.body.language;

    console.log("t'es dans le sendResetPasswordCode mon chum !");
    //let language = req.body.language;

    const findUser = await User.findOne({ where: { email: email } }).catch(
      (err) => {
        console.log(err);
      }
    );

    if (!findUser) {
      res.status(404).json("User not found");
    } else {
      // console.log("userController j'ai trouvé le user", findUser);

      // We generate a 16 character token
      for (i = 0; i <= 15; i++) {
        let randomNumber = Math.floor(Math.random() * charset.length);
        token += charset.substring(randomNumber, randomNumber + 1);
      }

      const checkToken = await Reset_Password.findOne({
        where: { userId: findUser.id },
      }).catch((err) => {
        console.log(err);
      });

      if (!checkToken) {
        console.log("email si !checktoken", email);

        userData = {
          userId: findUser.id,
          token: token,
          date: new Date(),
        };
        const tokenData = await Reset_Password.create(userData);
        console.log("email si !checktoken", email);
        //resetPasswordLink(language, email, token);
        resetPasswordCode(language, email, token);
        // We create a new user with all datas we set before

        res.status(200).json("Reset password code has been sent by email");
      } else if (checkToken) {
        console.log("email si checktoken", email);
        token = checkToken.dataValues.token;
        //resetPasswordLink(language, email, token);
        console.log("checkToken result", checkToken);
        resetPasswordLink(language, email, token);
        // We create a new user with all datas we set before

        res.status(200).json("Reset password code has been sent by email");
      } else {
        res
          .status(500)
          .json("Une demande est déjà en cours, vérifiez vos emails");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    let password = req.body.password;
    let token = req.body.token;

    const tokenData = await Reset_Password.findOne({
      where: { token: token },
    }).catch((err) => {
      console.log(err);
    });

    console.log(tokenData);

    if (!tokenData.date < Date.now() + 1) {
      let userId = tokenData.userId;

      const findUser = await User.findOne({
        where: { id: userId },
      }).catch((err) => {
        console.log(err);
      });

      const saltRounds = 10;

      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        password = hash;
      }

      findUser.update({ password: password });

      res.status(200).json("The password has been modified");
    } else {
      res.status(403).json("The token is not valid");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
