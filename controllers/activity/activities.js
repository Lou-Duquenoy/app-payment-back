const { response } = require("express");
const { EmailCampaignsApi } = require("sib-api-v3-sdk");
const Activity = require("../../models/Activity");
const Address = require("../../models/Address");
const User = require("../../models/User");
const jwt_decode = require("jwt-decode");
//const { Op } = require("sequelize/types");

//Road for create activities
module.exports.addActivity = async (req, res) => {
  try {
    console.log("HELLO");
    let data = req.body.data;
    console.log(data);
    let name = data.name;

    let city = data.city;
    let minimumPrice = data.minimumPrice;
    let cashBack = data.cashBack;
    let validity = data.validity;
    let website = data.website;
    let phoneNumber = data.phoneNumber;
    let presentation = data.presentation;
    let precision = data.precision;
	let morningDate1 = data.morningDate1;
	let morningDate2 = data.morningDate2;
	let afternoonDate1 = data.afternoonDate1;
	let afternoonDate2 = data.afternoonDate2;
    let rate = 0;
    let tarifMode = req.body.tarifModeValue;
    let cashBackMode = req.body.cashBackModeValue;
    let typeActivity = req.body.typeActivityValue;
    let selectedDay = req.body.selectedDayValue;
    let selectedCategory = req.body.selectedCategoryValue;
    let selectedEquipment = req.body.selectedEquipmentValue;
    let token = req.body.token;
    let jwtUser = jwt_decode(token);
    let email = jwtUser.email;
    console.log(email);
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      console.log("TEST");
      return res.status(400).json({ error: "User not found" });
    }

    let newActivities = {
      name: name,
      city: city,
      minimumPrice: minimumPrice,
      cashBack: cashBack,
      validity: validity,
      website: website,
      phoneNumber: phoneNumber,
      typeActivity: typeActivity,
      tarifMode: tarifMode,
      cashBackMode: cashBackMode,
      presentation: presentation,
      precision: precision,
	  morningDate1: morningDate1,
	  morningDate2: morningDate2,
	  afternoonDate1: afternoonDate1,
	  afternoonDate2: afternoonDate2,
      rate: rate,
      selectedDay: selectedDay,
      selectedCategory: selectedCategory,
	  selectedEquipment: selectedEquipment,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let activitiesC = await Activity.create(newActivities);
	res.status(201).json({ message: "Activité ajoutée avec succès", activity: activitiesC });
  } catch (err) {
    res.status(400).json({ err });
  }
};

//Road show all activities
module.exports.indexActivities = async (req, res) => {
  try {
    let iActivities = await Activity.findAll({
      include: { model: Address, required: true },
    });
    console.log(iActivities);
    res.json({ iActivities });
  } catch (err) {
    res.status(400).json({ err });
  }
};

//Road update activities
module.exports.updateMyActivities = async (req, res) => {
  try {
    let data = req.body;
    let activitieId = data.activitieId;
    let jwt = data.jwt;
    let jwtUser = jwt_decode(jwt);
    let user = await User.findOne({
      where: {
        email: jwtUser.email,
      },
    });
    let newInfoActivities = data.updateActivities;
    try {
      let checkactivities = await Activity.findOne({
        where: {
          id: activitieId,
          userId: user.id,
        },
      }).catch((err) => {
        return err;
      });
      if (checkactivities == null) {
        res.json({ message: false });
      } else {
        checkactivities.update(newInfoActivities);
        res.json({ checkactivities });
      }
    } catch (err) {
      res.json({ err });
    }
  } catch (err) {
    res.json({ err });
  }
};

//road show my activities
module.exports.myActivities = async (req, res) => {
  try {
    let data = req.body;
    let jwt = data.jwt;
    let jwtUser = jwt_decode(jwt);
    console.log(jwt);
    let user = await User.findOne({
      where: {
        email: jwtUser.email,
      },
    });
    let userId = user.id;
    let myActivities = await Activity.findOne({
      include: { model: Address },
      where: { userId: userId },
    });
    console.log(myActivities);
    res.json({ myActivities });
  } catch (err) {
    res.status(400).json({ err });
  }
};

//Road for show one activitie by id
module.exports.showIdActivities = async (req, res) => {
  try {
    let data = req.body;
    let activitieId = data.activitieId;
    let showActivities = await Activity.findOne({
      where: { id: activitieId },
    });
    let adresse = await Address.findOne({
      where: { id: showActivities.adressesld },
    });
    showActivities = {
      id: showActivities.id,
      picture: showActivities.picture,
      name: showActivities.name,
      description: showActivities.description,
      contry: adresse.contry,
      city: adresse.city,
      postCode: adresse.postCode,
      streetNumber: adresse.streetNumber,
      streetName: adresse.streetName,
      categoriesld: showActivities.ctegoriesld,
      minimunumPrice: showActivities.minimunumPrice,
      rate: showActivities.rate,
      type: showActivities.type,
      logo: showActivities.logo,
    };
    res.json(showActivities);
  } catch (err) {
    res.status(404).json({ err });
  }
};

//Road find activities by name or city or country
module.exports.findActivities = async (req, res) => {
  let data = req.body;
  let findActivities = data.input;
  let resultActivities = await Activity.findAll({
    include: { model: Address, required: true },
    where: {
      [Op.or]: [
        {
          name: findActivities,
        },
        { city: findActivities },
        { country: findActivities },
      ],
    },
  });
  res.json({ resultActivities });
};

//road for show the activities proximitie
module.exports.activityProxyUser = async (req, res) => {
  let data = req.body;
  let jwt = data.jwt;
  let geolocalisationUser = data.mygeolocalisation;
  console.log(geolocalisationUser);
  try {
    if (geolocalisationUser == null) {
      let jwtUser = jwt_decode(jwt);
      let user = await User.findOne({
        where: {
          email: jwtUser.email,
        },
      });
      //console.log(user);
      let cityUSer = user.city;
      let adresseUser = cityUSer.split(",");
      console.log(adresseUser);
      /*    const testl = await sequelize.query(
                "SELECT * FROM activities JOIN adressesT ON activities.adressesld = adressesT.id Where adressesT.city="+cityUSer
              ); */
      //let test =await activities.findByLocalite(adresseUser);
      let iActivities = await Activity.findAll({
        include: { model: Address, required: true },
        where: {
          "$adress.city$": adresseUser[0],
        },
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => console.log(err));
      console.log(iActivities);
      res.json({ iActivities });
    } else {
      res.json({ geolocalisationUser });
    }
  } catch (err) {
    res.json({ err });
  }
};
