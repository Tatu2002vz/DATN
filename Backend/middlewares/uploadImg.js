const multer = require("multer");
const { formidable } = require("formidable");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Comic = require('../models/comic')
const Chapter = require('../models/chapter')
const storage = multer.diskStorage({
  destination: asyncHandler(async function (req, file, cb) {
    let { comic, chapNumber } = req.body;
    // Get folder path 
    const folderPath = `public/${comic}/${chapNumber}/`;
    // Check exist
    const rs = await Chapter.findOne({ chapNumber, comic });
    const comicRecord = await Comic.findById(comic).select("title");
    if (rs)
      throw new Error(
        `Chapter ${chapNumber} of "${comicRecord.title}" is already in database`
      );
    // Create folder 
    if (!fs.existsSync(folderPath)) {
      await fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  }),
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname.replaceAll(" ", "-");
    cb(null, name);
  },
});

module.exports = multer({ storage: storage });
