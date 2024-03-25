const router = require('express').Router();
const controller = require('../controllers/comic')
const {verifyAccessToken, isAuthor} = require('../middlewares/verifyToken');

router.get('/', controller.getComics)
router.get('/:id', controller.getComic)
router.post('/', verifyAccessToken, controller.createComic)
router.put('/:id', [verifyAccessToken, isAuthor], controller.updateComic)
router.delete('/:id', [verifyAccessToken, isAuthor], controller.deleteComic)
module.exports = router