const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

router.post("/uploadAvatar", upload.single("avatar"), (req, res) => {
   console.log("************ FICHIER IMAGE REQ ************", req.file); 

  res.status(200).json(req.file);
});

module.exports = router;



