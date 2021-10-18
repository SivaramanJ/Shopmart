const router = require("express").Router();
const cloundinary = require("cloudinary");
const auth = require("../middleware/authentication");
const authAdmin = require("../middleware/authAdmin");
const fs = require('fs')

cloundinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      res.status(400).json({ msg: "No files uploaded" });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath);
        res.status(400).json({ msg: "Size should be less than 1 mb" });
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        res.status(400).json({ msg: "File format is incorret" });
    }
    cloundinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.messaage });
  }
});
const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router;
