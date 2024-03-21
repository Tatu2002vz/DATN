const mongoose = require("mongoose");

var chapterSchema = new mongoose.Schema({
  chapNumber: {
    type: Number,
    unique: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});


module.exports = mongoose.model('chapter', chapterSchema)