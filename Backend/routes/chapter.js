const router = require('express').Router();
const controller = require('../controllers/chapter')
const {verifyAccessToken, isAuthor} = require('../middlewares/verifyToken');
const fileUpload = require('../config/cloudinary.config')
const upload = require('../middlewares/uploadImg')

// router.post('/', controller.createChapter)
router.post('/', upload.array('files', 100), controller.createChapter);
router.get('/:id', controller.getListChapter)
router.delete('/:id', controller.deleteChapter)


module.exports = router