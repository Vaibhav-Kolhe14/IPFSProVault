const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js')
const asyncHandler = require('../utils/asyncHandler.js')
const ethers = require("ethers")
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')


const authentication = asyncHandler(async (req, res) => {
    try {
        const { signature } = req.body;
        const {accountAddress} = req.query;
        if(!signature) {
            throw new ApiError(400, "Signature is invalid")
        }

        const recoverAddress = ethers.utils.verifyMessage("Welcome to Crypto Vault Website", signature)
        // console.log("recoverAddress :: ", recoverAddress)

        if(accountAddress.toLowerCase() !== recoverAddress.toLowerCase()) {
            throw new ApiError(400, "Authentication Failed !")
        }

        const address = recoverAddress.toLowerCase()
        const user = await User.findOne({userAddress: address})

        if(!user) {
           const userData = await User.create({userAddress: address})
        //    console.log("User Data :: ", userData)
        }

        const token = jwt.sign({
            address
        }, process.env.JWT_SECRET_KEY)

        res.status(200).json(new ApiResponse(200, {Token: token}, "Success"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, {}, "AuthController Error :: ", error))
    }
})

module.exports = {
    authentication
}