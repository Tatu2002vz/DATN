const Purchase = require("../models/purchase");
const asyncHandler = require("express-async-handler");
const sttCode = require("../enum/statusCode");
const User = require("../models/user");
const Chapter = require("../models/chapter");
const getPurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Invalid id chapter");
  if (req.user && req.user._id) {
    const userId = req.user._id;
    const purchase = await Purchase.findOne({ user: userId, chapter: id });
    return res.status(sttCode.Ok).json({
      success: purchase ? true : false,
      mes: purchase ? purchase : "Something went wrong!",
    });
  }
  return res.status(sttCode.Ok).json({
    success: false,
    mes: "This chapter has not been purchased yet",
  });
});

const createPurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Invalid id chapter");
  if (!req.user || !req.user._id)
    throw new Error("You need to be logged in to continue this feature");
  const userId = req.user._id;
  const user = await User.findById(userId).select("walletBalance");
  const chapter = await Chapter.findById(id).select("price");
  if (user.walletBalance > chapter.price) {
    await User.findByIdAndUpdate(
      userId,
      { $inc: { walletBalance: -chapter.price } },
      { new: true }
    );
    const data = {
        user: userId,
        chapter: chapter,

    }
    const purchase = await Purchase.create(data)
    return res.status(sttCode.Ok).json({
        success: purchase ? true : false,
        mes: 'Purchase successfully'
    })
  }
});

const updatePurchase = asyncHandler(async (req, res) => {});

const deletePurchase = asyncHandler(async (req, res) => {});

module.exports = {
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
