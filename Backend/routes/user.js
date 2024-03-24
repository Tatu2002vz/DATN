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
router.put('/', verifyAccessToken, controller.updateUser)
router.delete('/delete', [verifyAccessToken, isAdmin] ,controller.deleteUser)

module.exports = router