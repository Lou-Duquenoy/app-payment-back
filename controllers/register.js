const { registerEmail } = require("../services/sendinblue/registerEmail");
const { registerSMS } = require("../services/sendinblue/registerSMS");
const {
  registerNotifOzaTeam,
} = require("../services/sendinblue/registerNotifOzaTeam");
const {
  registerSuccessEmail,
} = require("../services/sendinblue/registerSuccessEmail");
const User = require("../models/User");
const Verification_Key = require("../models/Verification_Key");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
let saltRounds = 10;

module.exports.sendRegisterEmail = (req, res) => {
  let registerData = req.body.data;
  console.log(registerData);
  registerEmail(registerData, res);
};

module.exports.sendRegisterEmailTest = async (req, res) => {
  try {
    let captchaToken = req.body.captchaToken;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${`6Lcr1lIiAAAAAKiLgpdVDYlbZEA8ybAlRPt7I1vW`}&response=${captchaToken}`
    );
    if (response.status === 200) {
      let registerData = req.body.data;
      console.log(registerData);
      registerEmail(registerData, res);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.sendRegisterSMS = (req, res) => {
  const visitorPhone = req.body.phone;
  console.log(visitorPhone);
  registerSMS(visitorPhone, res);
};

module.exports.verifyCode = async (req, res) => {
  let visitorInfos = req.body.data;

  let data = visitorInfos.visitorData;

  console.log("USER DATA", data);
  try {
    const findVisitor = await Verification_Key.findOne({ where: { data } });

    if (!findVisitor) {
      res.status(404).json("Visitor not found");
    } else if (visitorInfos.visitorCode == findVisitor.key) {
      res.status(200).json("Visitor found");
    } else {
      res.status(403).json("The visitor code is not valid");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.createUserMobile = async (req, res) => {
  let userData = req.body.data;
let language = req.body.language
  try {
    console.log("userController userInfos", userData);

    // We hash the password
    const hash = await bcrypt.hash(userData.password, saltRounds);
    if (hash) {
      userData.password = hash;
    }

    // Before creation, we check if the email already exists into the database
    const email = userData.email;
    // console.log("User model email", email);
    const findUser = await User.findOne({ where: { email } }).catch((err) => {
      console.log(err);
    });

    // If the email doesn' t exists, we create the user
    if (!findUser)  {
		userData.walletId = uuidv4();
      User.create(userData);
          let data = {
            email: userData.email,
            language: userData.language,
            userName: userData.firstName + " " + userData.lastName,
            Company: userData.company,
          };

           let successEmail = await registerSuccessEmail(data)
         
		  let notifOza = await registerNotifOzaTeam(data);

		
		  console.log("success email", successEmail.status);
		  console.log("notifOza ", notifOza.status);
		  
		  if ((successEmail.status === 200) & (notifOza.status === 200)) {
			  res.status(201).json("The user has been created");
		  } else {
			  res.status(500).json("Problem with register user notif or team Oza register notif");
		  }
		  ;
    } else {
      res.status(403).json("A user with this email address already exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

module.exports.createUser = async (req, res) => {
  let userData = req.body;
  for (const key in userData) {
    if (typeof userData[key] === 'string') {
      userData[key] = userData[key].replace(/"/g, '');
    }
  }
  console.log(userData);
  
  
  let language = userData.language;
  
  
	
	
	
	
  try {
    

    // We hash the password
    const hash = await bcrypt.hash(userData.password, saltRounds);
    if (hash) {
      userData.password = hash;
    }

    // Before creation, we check if the email already exists into the database
    const email = userData.email;
    
    const findUser = await User.findOne({ where: { email } }).catch((err) => {
      console.log(err);
    });
    
    // If the email doesn' t exists, we create the user
    if (!findUser) {
	  console.log("hello");
      userData.walletId = uuidv4();
	  
      const newUserCreate = User.create(userData);
	  
      let data = {
        email: userData.email,
		language: userData.language,
        userName: userData.firstName + " " +userData.lastName,
        
      };
      

       res.status(201).json("The user has been created");
    } else {
      res.status(403).json("A user with this email address already exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
