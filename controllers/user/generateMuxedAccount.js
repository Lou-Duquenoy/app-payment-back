const User = require("../../models/User");
const crypto =  require("crypto");
const { v4: uuid } = require('uuid');
const { Op } = require("sequelize");
module.exports.generateWalletId = async (req, res) => {
  try {
    const users = await User.findAll({ where: { walletId: { [Op.ne]: null } } });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with a non-null wallet ID" });
    }
    users.forEach(user => {
      user.update({ walletId: uuid() });
    });
    return res.json({ message: "Wallet IDs generated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error generating wallet IDs" });
  }
}