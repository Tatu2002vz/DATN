const mongoose = require("mongoose");

var comicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    genre: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Genre",
      },
    ],
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Comic", comicSchema);
