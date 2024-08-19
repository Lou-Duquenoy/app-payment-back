const { Op } = require("sequelize");
const Activity = require("../../models/Activity");

module.exports.update = async (req, res) => {
try {
		
 let data = req.body.data;
 let token = req.body.token;
 let decoded = jwt_decode(token);
 let loggedUserEmail = decoded.email;

let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });
	
if (loggedUser) {
	let activity = Activity.create(data,
	where: {
    picture: {
      [Op.eq]: data.picture
    },
	name: {
      [Op.eq]: data.name
    },
	description: {
      [Op.eq]: data.description
    },
	minimumPrice: {
      [Op.eq]: data.minimumPrice
    },
	rate: {
      [Op.eq]: data.rate
    },
	logo: {
      [Op.eq]: data.logo
    },
  });
	
	if(activity) {
		res.status(200).json("The activity has been updated");
	} else {
		res.status(500).json("Activity not found");
	}
} else {
res.status(500).json("The token is not valid");
}
	} catch (err) {
    res.status(400).json({ err });
  }
}