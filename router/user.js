const express = require("express");
const router = express.Router();
const { update } = require("../controllers/user/update");
const {
  generateWalletId,
} = require("../controllers/user/generateMuxedAccount");
const { getData } = require("../controllers/user/getData");
const { destroy } = require("../controllers/user/destroy");
const {
  getTransactionsByUser,
} = require("../controllers/user/getTransactionsByUser");
const {
  getUserForTransaction,
} = require("../controllers/user/getUserForTransaction");
const {
  getUsersForTransaction,
} = require("../controllers/user/getUsersForTransaction");
const {
  getBSCBalance,
} = require("../controllers/user/getBSCBalance");
const {
resetPassword,
 sendResetPasswordCode,
	sendResetPasswordLink,
} = require("../controllers/user/resetPassword");
const {
  readAll,
  askCash,
  setRead,
} = require("../controllers/user/notifications");
const {
  getUserInfo,
} = require("../controllers/user/getUserInfo");

router.post("/getData", getData);
router.post("/getBSCBalance", getBSCBalance);
router.post("/update", update);
router.post("/delete", destroy);
router.post("/generatewalletid", generateWalletId);
router.post("/resetPassword", resetPassword);
router.post("/resetPasswordCode", sendResetPasswordCode);
router.post("/resetPasswordLink", sendResetPasswordLink);
router.post("/getTransactions", getTransactionsByUser);
router.post("/getUserForTransaction", getUserForTransaction);
router.post("/getUsersForTransaction", getUsersForTransaction);
router.post("/readNotifications", readAll);
router.post("/askCashNotification", askCash);
router.post("/notificationStatus", setRead);
router.post("/getUserInfo", getUserInfo);

module.exports = router;
