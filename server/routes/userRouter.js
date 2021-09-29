const router = require("express").Router();
const userContoller = require("../controllers/userController");
const authController = require("../middleware/authentication");

router.post('/register', userContoller.register)
router.post('/login', userContoller.login)
router.post('/logout', userContoller.logout)
router.get('/refreshToken', userContoller.refreshToken)

router.get('/info', authController, userContoller.getUser)

module.exports = router