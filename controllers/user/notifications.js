require("dotenv").config();
const Notification = require("../../models/Notification");
const User = require("../../models/User");
//const bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");

// Read all notification that belog to a userId

module.exports.readAll = async (req, res) => {
  let jwt = req.body.token;
  let decoded = jwt_decode(jwt);
  let loggedUserEmail = decoded.email;
  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  if (loggedUser) {
    try {
      let userId = loggedUser.id;

      let readAll = await Notification.findAll({
        where: { userId: userId, isRead: false },
      }).then((response) => {
        console.log(response), res.status(200).json(response);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};

//Create a notification for a cash request

module.exports.askCash = async (req, res) => {
  let jwt = req.body.token;
  let decoded = jwt_decode(jwt);
  let loggedUserEmail = decoded.email;
  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  let notificationInfos = req.body.data;

  console.log(notificationInfos);
  let senderWalletId = notificationInfos.senderWalletId;
  let receiverWalletId = notificationInfos.receiverWalletId;

  if (loggedUser) {
    let type = "request";

    try {
      const receiver = await User.findOne({
        where: { walletId: receiverWalletId },
      }).catch((err) => {
        console.log(err);
      });

      const sender = await User.findOne({
        where: { walletId: senderWalletId },
      }).catch((err) => {
        console.log(err);
      });

      let data = {
        senderFirstName: sender.firstName,
        senderLastName: sender.lastName,
        receiverWalletId: receiver.walletId,
        senderWalletId: sender.walletId,
        amount: notificationInfos.amount,
        motive: notificationInfos.motive,
        text: `${sender.firstName} ${sender.lastName} vous demande de lui envoyer ${notificationInfos.amount} EUR pour : ${notificationInfos.motive} !`,
      };

      let notificationData = {
        userId: receiver.id,
        notificationType: type,
        data: data,
      };

      let createNotif = await Notification.create(notificationData).then(
        (response) => {
          res.json(response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports.setRead = async (req, res) => {
  let jwt = req.body.token;
  let decoded = jwt_decode(jwt);
  let loggedUserEmail = decoded.email;
  let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });

  console.log("t'es dans la notif read mon chum");
  if (loggedUser) {
    try {
      let notificationId = req.body.notificationId;

      let toggleNotificationRead = await Notification.update(
        { isRead: true },
        { where: { id: notificationId } }
      ).then(() => {
        res.status(200).json("Notification status have been changed");
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(500).json("User token is not valid");
  }
};
