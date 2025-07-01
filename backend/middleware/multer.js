// middleware/multer.js
const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// Optional: restrict file types to images
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValidExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowed.test(file.mimetype);

  if (isValidExt && isValidMime) cb(null, true);
  else cb("Only images are allowed!");
};

// Export the configured multer middleware
const upload = multer({ storage, fileFilter });
module.exports = upload;
