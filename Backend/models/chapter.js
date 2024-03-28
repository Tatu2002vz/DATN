const mongoose = require("mongoose");

var chapterSchema = new mongoose.Schema({
  comic: {
    type: mongoose.Types.ObjectId,
    ref: 'Comic'
  },
  chapName: {
    type: String,
  },
  chapNumber: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    default: 0
  },
  images: [{ type: String }],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
    },
  ],
});

module.exports = mongoose.model("chapter", chapterSchema);
