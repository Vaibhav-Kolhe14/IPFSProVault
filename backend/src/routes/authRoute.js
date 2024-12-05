const { Router } = require('express')
const { authentication } = require('../controllers/authController')


const router = Router()

router.route('/auth').post(authentication)

module.exports = router