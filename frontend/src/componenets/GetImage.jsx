import React, { useEffect, useState } from 'react'
import { UseWeb3Context } from '../contexts/UseWeb3Context'
import axios from 'axios'
import toast from 'react-hot-toast';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

function GetImage({reload}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const {web3State} = UseWeb3Context();
  const {selectedAccount, contractInstance} = web3State;

  useEffect(() => {
    try {
      const getImageHashes = async() => {
        const ipfsHashes = await contractInstance.viewFiles(selectedAccount)
        console.log("IPFS Hashed from Get Image :: ", ipfsHashes)
        return ipfsHashes;
      }
    
      // const getImage = async() => {
      //   setLoading(true)
      //   const ipfsHashes = await getImageHashes()
      //   console.log("IPFS Hashes 2 :: ", ipfsHashes)
      //   const ipfsHashArray = Object.values(ipfsHashes)
      //   console.log("IPFS Hsh Array :: ", ipfsHashArray)
    
      //   const token = localStorage.getItem("token")
      //   const config = {
      //     headers: {
      //       'x-access-token': token
      //     }
      //   }
    
      //   const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-image?page=${currentPage}&limit=${imagePerPage}`, ipfsHashArray, config)
      //   console.log("res from get Image :: ", res.data)
    
      //   const imagesData = res.data.data.decryptedImageArray
      //   console.log("Images Data :: ", imagesData)
    
      //   setImages(imagesData)
      //   setLoading(false)
      // } 
      const getImage = async() => {
        setLoading(true)
        try {
          const ipfsHashes = await contractInstance.viewFiles(selectedAccount)
          console.log("IPFS Hashes:", ipfsHashes)
          
          // Convert the result properly - Solidity returns may need special handling
          const ipfsHashArray = []
          if (ipfsHashes && ipfsHashes.length) {
            for (let i = 0; i < ipfsHashes.length; i++) {
              ipfsHashArray.push(ipfsHashes[i])
            }
          }
          
          console.log("IPFS Hash Array:", ipfsHashArray)
          
          if (ipfsHashArray.length === 0) {
            setImages([])
            return
          }
      
          const token = localStorage.getItem("token")
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-image?page=${currentPage}&limit=${imagePerPage}`,
            ipfsHashArray,
            {
              headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
              }
            }
          )
          
          console.log("Decrypted Image Array:", res.data.data.decryptedImageArray)
    console.log("Array Length:", res.data.data.decryptedImageArray.length)

    console.log("IPFS Hash Array being sent:", ipfsHashArray);
console.log("Page:", currentPage, "Limit:", imagePerPage);

          setImages(res.data.data.decryptedImageArray)
        } catch (error) {
          console.error("Error:", error)
          toast.error("Error fetching images")
        } finally {
          setLoading(false)
        }
      }
  
      contractInstance && getImage()
    } catch (error) {
      console.log("Error in UseEffect of getImage.jsx :: ", error)
      toast.error("Error In Fetching Image")
    } finally {
      setLoading(false)
    }
  }, [contractInstance, selectedAccount, currentPage, imagePerPage, reload])


  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (<>
    {  !loading?(
        images.length>0?
        (
         <div className="flex justify-start md:justify-center items-center w-full  overflow-x-auto">
            {images.map((imgData, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imgData}`}
                alt={`Image ${index + 1}`}
                className="w-[300px] h-[240px]  mx-2 object-cover"
              />
            ))}
          </div>
        )
        :(
        <p>No images found</p>
        )):<p>Loading...</p>
     }
    <div className="w-full h-20 flex justify-center items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <CircleArrowLeft className="w-8 h-8 opacity-80" />
        </button>
        <span className="font-bold text-[24px]">{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight className="w-8 h-8 opacity-80" />
        </button>
      </div>
   
    </>);
}

export default GetImage
