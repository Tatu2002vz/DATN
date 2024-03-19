const mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comicWorks: [{ type: mongoose.Types.ObjectId, ref: "Comic" }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Author", authorSchema);
