const express = require("express");
const router = express.Router();
const {
  sendRegisterEmail,
  sendRegisterEmailTest,
  sendRegisterSMS,
  createUserMobile,
  createUser,
  verifyCode,
	
} = require("../controllers/register");
router.post("/sendRegisterEmail", sendRegisterEmail);
router.post("/sendRegisterEmailTest", sendRegisterEmailTest);
router.post("/sendRegisterSMS", sendRegisterSMS);
router.post("/createUserMobile", createUserMobile);
router.post("/createUser", createUser);
router.post("/verifyCode", verifyCode);

module.exports = router;
