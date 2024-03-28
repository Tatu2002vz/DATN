const router = require('express').Router();
const controller = require('../controllers/chapter')
const {verifyAccessToken, isAuthor} = require('../middlewares/verifyToken');
const fileUpload = require('../config/cloudinary.config')


router.post('/', controller.createChapter)
router.get('/:id', controller.getListChapter)
router.delete('/:id', controller.deleteChapter)


module.exports = router