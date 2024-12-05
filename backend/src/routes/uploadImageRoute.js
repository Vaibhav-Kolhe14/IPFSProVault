const { Router } = require('express')
const { uploadImage } = require('../controllers/uploadImageController')
const { uploadUsersImage } = require('../middlewares/multer.js')
const { authenticateToken } = require("../middlewares/authenticateToken.js")


const router = Router()

router.route('/upload-image').post(authenticateToken, uploadUsersImage, uploadImage)

module.exports = router