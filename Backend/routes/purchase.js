const router = require("express").Router();
const controller = require("../controllers/purchase");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/:id", [verifyAccessToken], controller.createPurchase);
router.get("/:id", [verifyAccessToken], controller.getPurChase);

module.exports = router;
