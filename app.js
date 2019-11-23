var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();
var uploadImage = require("./api/uploadImage");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());

app.use("/upload", uploadImage);

port = process.env.port || 3000;

app.listen(port, () => {
  console.log("listening at port 3000...");
});
