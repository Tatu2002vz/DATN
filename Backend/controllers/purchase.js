const Purchase = require("../models/purchase");
const asyncHandler = require("express-async-handler");
const sttCode = require("../enum/statusCode");
const User = require("../models/user");
const Chapter = require("../models/chapter");
const chapter = require("../models/chapter");

const createPurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Invalid id chapter");
  if (!req.user || !req.user._id)
    throw new Error("You need to be logged in to continue this feature");
  const userId = req.user._id;
  const {comicID} = req.body
  console.log(comicID);
  const user = await User.findById(userId).select("walletBalance");
  const chapter = await Chapter.findById(id).select("price");
  const checkIsBought = await Purchase.findOne({ user: userId, chapter: id });
  if (checkIsBought) throw new Error("This chapter has been purchased!");
  if (user.walletBalance >= chapter.price) {
    const data = {
      user: userId,
      chapter: chapter,
      comic: comicID
    };
    const purchase = await Purchase.create(data);
    await User.findByIdAndUpdate(
      userId,
      { $inc: { walletBalance: -chapter.price } },
      { new: true }
    );
    return res.status(sttCode.Ok).json({
      success: purchase ? true : false,
      mes: "Purchase successfully",
    });
  }
  throw new Error("Purchase failed! Your balance is unavailable!");
});
const getPurChase = asyncHandler(async (req, res) => {
  if (!req.user) throw new Error("Please go to the login page");
  else {
    const { _id } = req.user;
    if (!_id) throw new Error("Please go to the login page");
    const { id } = req.params;
    if (!id) throw new Error("Missing id chapter");

    const purchase = await Purchase.findOne({ user: _id, chapter: id })
    return res.status(sttCode.Ok).json({
      success: purchase ? true : false
    })
  }
});

const getAllPurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.find().populate('chapter', 'price chapNumber').populate('comic', 'title coverImage').populate('user', 'fullname')
  return res.status(sttCode.Ok).json({
    success: purchase ? true : false,
    mes: purchase? purchase : 'Something went wrong'
  })
})
const updatePurchase = asyncHandler(async (req, res) => {});

const deletePurchase = asyncHandler(async (req, res) => {});

module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurChase,
  getAllPurchase
};
