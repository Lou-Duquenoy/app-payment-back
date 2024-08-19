const express = require("express");
const router = express.Router();
const { createPayementIntent } = require("../services/stripe");

router.post("/", createPayementIntent);
/* router.get("/", createStripe);
router.post("/", checkoutStripe); */

module.exports = router;
