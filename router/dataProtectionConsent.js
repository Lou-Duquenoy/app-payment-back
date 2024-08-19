const express = require("express");
const router = express.Router();
const {
  displayRgpd,
  addRgpd,
} = require("../controllers/dataProtectionConsent");

router.post("/", displayRgpd);
router.post("/add", addRgpd);

module.exports = router;
