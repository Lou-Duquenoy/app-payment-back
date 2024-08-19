const { send } = require("express/lib/response");
const Sequelize = require("sequelize");
const connexion = require("../database");

const Data_Protection_Consent = connexion.define("Data_Protection_Consents", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ip: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
});

// We search into the database for the user with email we receive from the controller
Data_Protection_Consent.getRgpd = async (RGPDData) => {
  const ip = RGPDData;
  const Ip = await Data_Protection_Consent.findOne({
    where: { ip },
  }).catch((err) => {
    console.log(err);
  });
  /*  console.log(Ip.ip); */
  return Ip.ip;
};

Data_Protection_Consent.createIp = async (RGPDData, res) => {
  const ip = RGPDData.ip;
  console.log("ip de createip est =" + ip);
  const Ip = await Data_Protection_Consent.findOne({
    where: { ip },
  }).catch((err) => {
    console.log(err);
  });
  console.log("l'ip est t'elle trouvé" + Ip);
  if (!Ip) {
    console.log("here ip of ip1=" + RGPDData);
    const RgpdDataWrite = await Data_Protection_Consent.create(RGPDData);
    /*        .then((rgpd) => res.status(201).send(rgpd)).catch((err) => {
            console.log(err)
          });
          console.log(rgpd);
        } */
    if (RgpdDataWrite) {
      return "ip save";
    } else {
      return "ip no save";
    }
  }
};

module.exports = Data_Protection_Consent;
