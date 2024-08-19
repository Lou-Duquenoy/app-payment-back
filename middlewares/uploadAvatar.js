const multer = require("multer");
const path = require("path");

module.exports.uploadAvatar = (req, res, next) => {

	const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, "avatars");
  },

  filename: (req, file, callback) => {
    let imagePath = Date.now() + path.extname(file.originalname);
    callback(null, imagePath);

  },
});

const upload = multer({ storage: storage });
	
	return upload
}


