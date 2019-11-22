var multer = require("multer");

//multer diskstorage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const uploadDisk = multer({
  storage: diskStorage,
  fileFilter: imageFileFilter
});

//multer memorystorage configuration
const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({
  storage: memoryStorage,
  fileFilter: imageFileFilter
});

module.exports = { uploadDisk, uploadMemory };
