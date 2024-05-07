const router = require('express').Router()
const controller = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/current', verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshToken)
router.post('/forgotpassword', controller.forgotPassword)
router.put('/reset-password/:token', controller.resetPassword)
router.get('/', [verifyAccessToken, isAdmin] ,controller.getAllUsers)
router.put('/:id_update', verifyAccessToken, controller.updateUser)
router.delete('/delete/:id', [verifyAccessToken] ,controller.deleteUser)
router.get('/:id', controller.getUser)

module.exports = router