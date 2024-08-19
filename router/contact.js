const express = require("express");
const router = express.Router();
const { contact, sendContact } = require("../controllers/contact");

router.post("/", contact);
router.post("/sendContact", sendContact);
module.exports = router;
