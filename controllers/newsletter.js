const { registerEmail } = require("../services/sendinblue/registerEmail");
const { registerSMS } = require("../services/sendinblue/registerSMS");
const {
  registerNotifOzaTeam,
} = require("../services/sendinblue/registerNotifOzaTeam");
const {
  registerSuccessEmail,
} = require("../services/sendinblue/registerSuccessEmail");
const { registerNewsLetterEmail } = require("../services/sendinblue/registerNewsLetterEmail");
const User = require("../models/User");
const Verification_Key = require("../models/Verification_Key");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
let saltRounds = 10;

module.exports.newsletterEmail = async (req, res) => {
  let registerData = req.body.data;
  console.log("TEST", registerData);
  registerNewsLetterEmail(registerData, res);
};
