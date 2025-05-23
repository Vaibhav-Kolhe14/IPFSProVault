const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js')
const asyncHandler = require('../utils/asyncHandler.js')
const User = require('../models/userModel.js')
const { decryptData } = require('../utils/decryption.js')
const axios = require('axios')



const returnIpfsResponse = async(ipfsHash) => {
    const res = await axios(`${process.env.PINATA_GATEWAY}/${ipfsHash}`)
    return res.data;
}

// const getImage = asyncHandler(async (req, res) => {
//     try {
//         const address = req.address
//         const userAddress = address.toLowerCase()
//         const user = await User.findOne({userAddress : userAddress})

//         if(!user) {
//             throw new ApiError(400, 'User does not exist !')
//         }

//         const {page, limit} = req.query
//         const pageNumber = parseInt(page) || 1;
//         const limitNumber = parseInt(limit) || 1;

//         if(pageNumber < 1 || limitNumber < 1) {
//             throw new ApiError(401, "Pagination issue")
//         }

//         const startIndex = (pageNumber-1)*limitNumber;
//         const endIndex = pageNumber*limitNumber

//         console.log("\nstartIndex :", startIndex)
//         console.log("\nendIndex : ", endIndex)

//         const ipfsHashArray = req.body.slice(startIndex, Math.min(req.body.length, endIndex))
//         console.log("IPFS Hash Array Backend :: ", ipfsHashArray)


//         if(ipfsHashArray.length === 0) {
//             throw new ApiError(400, "No data in IPFS Hash Array")
//         }

//         const decryptedImageArray = []

//         const encryptedDataArray = await Promise.all(ipfsHashArray.map(async(ipfsHash) => {
//             const response = await returnIpfsResponse(ipfsHash)
//             console.log("Response from :: ", response)
//             return response
//         }))
//         console.log("encryptedDataArray :: ", encryptedDataArray)
//         for(const img of encryptedDataArray) {
//             const decryptedImgData = decryptData(img.encryptedData, img.iv, user.encryptionKey)
//             decryptedImageArray.push(decryptedImgData.toString('base64'))
//         }

//         console.log("Decrypt Image Array :: ", decryptedImageArray)

//         res.status(200).json(new ApiResponse(200, {decryptedImageArray: decryptedImageArray}, "Image Fetched"))
//     } catch (error) {
//         console.log("Error in get image Controller :: ", error)
//         throw new ApiError(400, "Error in Getting Image !")
//     }
// })

const getImage = asyncHandler(async (req, res) => {
    try {
      const address = req.address
      const userAddress = address.toLowerCase()
      const user = await User.findOne({userAddress: userAddress})
  
      if(!user) {
        throw new ApiError(400, 'User does not exist!')
      }
  
      const {page = 1, limit = 2} = req.query
      const hashes = req.body // Get hashes from request body
  
      const pageNumber = parseInt(page)
      const limitNumber = parseInt(limit)
  
      if(!hashes || hashes.length === 0) {
        return res.status(200).json(new ApiResponse(200, {decryptedImageArray: []}, "No images found"))
      }
      console.log("Received Hashes:", hashes);
console.log("Received Hash Count:", hashes.length);

      const startIndex = (pageNumber-1)*limitNumber
      const endIndex = pageNumber*limitNumber
      const ipfsHashArray = hashes.slice(startIndex, Math.min(hashes.length, endIndex))
      console.log("Start Index:", startIndex);
console.log("End Index:", endIndex);
console.log("Hashes to Process:", ipfsHashArray);

      const decryptedImageArray = []
      for(const ipfsHash of ipfsHashArray) {
        const response = await returnIpfsResponse(ipfsHash)
        const decryptedImgData = decryptData(response.encryptedData, response.iv, user.encryptionKey)
        decryptedImageArray.push(decryptedImgData.toString('base64'))
      }
  
      res.status(200).json(new ApiResponse(200, {decryptedImageArray}, "Images fetched"))
    } catch (error) {
      console.error("Error:", error)
      throw new ApiError(400, "Error processing images")
    }
  })
  
module.exports = {
    getImage
}