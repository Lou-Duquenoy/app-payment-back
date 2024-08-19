const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
const { Op } = require("sequelize");

module.exports.getUserForTransaction = async (req, res) => {
  let token = req.body.token;
  let decoded = jwt_decode(token);
  let loggedUserEmail = decoded.email;
  let searchUser = req.body.user;

  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser) {
    try {
      let user = await User.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: `${searchUser}%`,
              },
            },
            {
              lastName: {
                [Op.iLike]: `${searchUser}%`,
              },
            },
            {
              email: {
                [Op.iLike]: `${searchUser}%`,
              },
            },
          ],
          email: {
            [Op.ne]: loggedUserEmail,
          },
        },
        attributes: ["firstName", "lastName", "email", "walletId", "avatar"],
      }).then((response) => {
        console.log(response);
        return response;
      });

      res.json({ user });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};
