const { Router } = require('express')
const { getImage } = require('../controllers/getImageController.js')
const { authenticateToken } = require("../middlewares/authenticateToken.js")


const router = Router()

router.route('/get-image').post(authenticateToken, getImage)

module.exports = router