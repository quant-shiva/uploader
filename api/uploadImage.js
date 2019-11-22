var express = require("express");
var multer = require("../config/multer");
var cloudinary = require("cloudinary");

const uploadRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

uploadRouter
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /uploadImage");
  })
  .post(multer.uploadMemory.single("imageFile"), (req, res) => {
    console.log("uploading...\n\n");
    let uri =
      "data:" +
      req.file.mimetype +
      ";base64," +
      req.file.buffer.toString("base64");
    cloudinary.uploader.upload(uri, (err, image) => {
      if (err) console.log(err);
      else {
        console.log(image);
      }
    });
    console.log(req.file);
    res.send("ho gaya");
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /imageUpload");
  });

module.exports = uploadRouter;
