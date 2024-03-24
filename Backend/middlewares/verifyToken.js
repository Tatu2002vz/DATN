const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sttCode = require("../constants/statusCode");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        res.status(sttCode.Unauthorized).json({
          success: false,
          mes: "Invalid Access Token",
        });
      req.user = decode;
      next();
    });
  } else {
    res.status(sttCode.Unauthorized).json({
      success: false,
      mes: "Authentication Required",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(sttCode.Unauthorized).json({
      success: false,
      mes: "Required Admin Role",
    });
  next();
});

module.exports = {
  verifyAccessToken,
  isAdmin,
};
