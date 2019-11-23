var express = require("express");
var multer = require("../config/multer");
var cloudinary = require("cloudinary");

const uploadRouter = express.Router();

//configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//multer is using to parse multipart form data
//multer memory storage used,it stores file in memory buffer
//Hence no need to store file at local disk
//buffer will be converted to base-64 URI
//URI passes as file argument to cloudinary upload method

uploadRouter
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /uploadImage");
  })
  .post(multer.uploadMemory.single("imageFile"), (req, res) => {
    let uri =
      "data:" +
      req.file.mimetype +
      ";base64," +
      req.file.buffer.toString("base64"); //converting buffer to base64 uri
    cloudinary.v2.uploader.upload(uri, (err, image) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.statusMessage = "Image not uploaded to cloud, please try again.";
        res.end("Image not uploaded.");
      } else {
        console.log(image);
        res.statusCode = 200;
        res.json(image);
      }
    });
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
