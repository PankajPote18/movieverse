const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir('uploads/movies');
ensureDir('uploads/thumbnails');
ensureDir('uploads/banners');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') cb(null, 'uploads/movies/');
    else if (file.fieldname === 'thumbnail') cb(null, 'uploads/thumbnails/');
    else cb(null, 'uploads/banners/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
module.exports = upload;
