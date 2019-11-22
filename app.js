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
app.get("/", (req, res) => {
  console.log(process.env.CLOUD_NAME);
  res.end("ho gaya!!!");
});

port = process.env.port || 3000;

app.listen(port, () => {
  console.log("listening at port 3000...");
});
