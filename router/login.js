const express = require("express");
const router = express.Router();
const { login, loginTest } = require("../controllers/login");

router.post("/", login);
router.post("/loginTest", loginTest);
module.exports = router;
