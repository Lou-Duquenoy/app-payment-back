const express = require("express");
const router = express.Router();
const { lottery } = require("../controllers/transaction/lottery");
const { recharge } = require("../controllers/transaction/recharge");
const { transaction } = require("../controllers/transaction/transaction");
const { convertEURToOZA } = require("../controllers/transaction/swap");

router.post("/", transaction);
router.post("/lottery", lottery);
router.post("/recharge", recharge);
router.post("/convertEURToOZA", convertEURToOZA);

module.exports = router;
