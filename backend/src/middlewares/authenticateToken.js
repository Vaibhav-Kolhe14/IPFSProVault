const ApiError = require('../utils/ApiError.js');
const jwt = require('jsonwebtoken')

async function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token']
    // console.log("\nReq.headers :: ", token)
    if(!token) {
        throw new ApiError(400, "No token found !")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.address = decoded.address
    next()
}

module.exports = { authenticateToken }