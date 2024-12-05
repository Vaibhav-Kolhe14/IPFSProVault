const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js')
const asyncHandler = require('../utils/asyncHandler.js')
const { generateEncryptionKey } = require('../utils/generateKey.js')
const User = require('../models/userModel.js')
const {encryptFile} = require('../utils/encryption.js')
const pinataSDK = require('@pinata/sdk')


const uploadImage = asyncHandler(async (req, res) => {
    try {
        console.log("Req.file :: ",req.file)

        const address = req.address
        const userAddress = address.toLowerCase()
        const user = await User.findOne({userAddress : userAddress})

        if(!user) {
            throw new ApiError(400, 'User does not exist !')
        }

        if(user.encryptionKey === null ){
            const encryptionKey = generateEncryptionKey(32)
            user.encryptionKey = encryptionKey
            await user.save()
        }

        const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryptionKey)
        console.log("Encrypted data from uploadimage controller :: ", encryptedData)

        const pinata = new pinataSDK({
            pinataApiKey: process.env.PINATA_API_KEY,
            pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
        });

        const resPinata = await pinata.pinJSONToIPFS({encryptedData, iv})
        console.log("resPinata :: ", resPinata)

        // const auth = await pinata.testAuthentication()
        // console.log("Auth from pinata :: ", auth)


        res.status(200).json(new ApiResponse(200, {ipfsHash: resPinata.IpfsHash}, "Done"))        
    } catch (error) {
        console.log("Error in upload image Controller :: ", error)
        throw new ApiError(400, "Error in Uploading Image !")
    }
})

module.exports = {
    uploadImage
}