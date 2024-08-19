require("dotenv").config();
const Data_Protection_Consent = require("../models/Data_Protection_Consent");
const bcrypt = require("bcryptjs");
const SibApiV3Sdk = require("sib-api-v3-sdk");

module.exports.displayRgpd = async (req, res) => {
  try {
    let ip = req.body.ip;
    // We search into the database for a user with an email equal to the one we got in the front end form
    let RGPDData = await Data_Protection_Consent.getRgpd(ip);
    console.log("here" + RGPDData);
    res.json(true);
  } catch (err) {
    console.log(err);
    res.status(404).json("pas d'ip");
  }
};

module.exports.addRgpd = async (req, res) => {
  const ip = req.body;
  console.log(ip);
  const newip = await Data_Protection_Consent.createIp(ip);
  console.log("test =" + newip);
  if (newip === "ip save") {
    res.json("ip enregistré");
  } else {
    res.json("ip déjà présent");
  }
};
