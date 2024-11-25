const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/"); // Store in public/images
  },
  filename: function (req, file, cb) {
    // Get the date string (e.g., "Sat Nov 23 2024")
    const dateString = new Date().toDateString();

    // Replace spaces with dashes to match the desired format (e.g., "Sat-Nov-23-2024")
    const timestamp = dateString.replace(/ /g, "-");

    // Use the formatted timestamp with the original file name
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
