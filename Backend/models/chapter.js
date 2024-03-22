const mongoose = require("mongoose");

var chapterSchema = new mongoose.Schema({
  chapName: {
    type: String,
  },
  chapNumber: {
    type: Number,
    unique: true,
  },
  price: {
    type: Number,
    default: 0
  },
  images: [{ type: String }],
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("chapter", chapterSchema);
