const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const { response } = require("express");
const {
  generateAccessToken,
  generatereFreshToken,
} = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password || !fullname) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`User ${user.email} is already registered`);
  } else {
    const response = await User.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Register successfully!" : "Error creating",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);

    const refreshToken = generatereFreshToken(response._id);
    await User.findOneAndUpdate(response._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      userData: userData,
    });
  } else {
    throw new Error("Email or password is incorrect");
  }
});
module.exports = {
  register,
  login,
};
