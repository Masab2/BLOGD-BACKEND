const multer = require("multer");
const path = require("path")
// For Upload Image into the server we use the multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads/img"),
    filename: function (req, file, cb) {
      return cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  

// filter
const filefilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(new Error("Only .png .jpg & .jpeg formatted Allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

module.exports = upload;
