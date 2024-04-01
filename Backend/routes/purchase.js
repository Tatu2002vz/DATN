const router = require("express").Router();
const controller = require("../controllers/purchase");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/:id", [verifyAccessToken], controller.createPurchase);

module.exports = router;
