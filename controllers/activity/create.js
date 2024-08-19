const Activity = require("../../models/Activity");

module.exports.create = async (req, res) => {
try {
		
 let data = req.body.data;
 let token = req.body.token;
 let decoded = jwt_decode(token);
 let loggedUserEmail = decoded.email;

let loggedUser = await User.findOne({ where: { email: loggedUserEmail } });
	
if (loggedUser) {
	let activity = Activity.create(data);
	
	if(activity) {
		res.status(200).json("The activity has been created");
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