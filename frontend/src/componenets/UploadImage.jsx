import React,{ useState } from 'react'
import axios from 'axios'
import { UseWeb3Context } from '../contexts/UseWeb3Context'
import toast from 'react-hot-toast';
import {ImageUp} from 'lucide-react'

function UploadImage({reloadEffect}) {

  const [file, setFile] = useState(null)
  const [loading, setloading] = useState(false)

  const {web3State} = UseWeb3Context();
  const {contractInstance, selectedAccount} = web3State;

  const uploadImageHash = async(ipfsHash) => {
    console.log("contract instance :: ", contractInstance)
    // const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash)
    await toast.promise(contractInstance.uploadFile(selectedAccount, ipfsHash),{
      loading: "Transaction is pending",
      success: "Transaction is successful",
      error: "transaction is failed"
    })
    console.log("Tx from upload image :: ")
  }

  const handleImageUpload = async () => {
    try {
      setloading(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "x-access-token": token
        }
      }
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/upload-image`, formData, config);

      console.log("Res from Upload image :: ", res)
      console.log("IPFS HASH from backend :: ", res.data.data.ipfsHash)
      await uploadImageHash(res.data.data.ipfsHash)
      toast.success("Image Uploaded")
      setloading(false)
      reloadEffect()
    } catch (error) {
      console.log("Error in UploadImage.jsx in handleImageUpload :: ", error)
      toast.error("Image Upload Failed")
    } finally{
      setloading(false)
    }
  }

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center gap-6">
    <p className="font-semibold md:text-[24px]">
      Upload file with Web3s Security
    </p>
    <div className="w-full flex justify-center items-center">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-[200px] md:w-[210px]"
      />
    </div>
    {file ? (
      <button
        onClick={handleImageUpload}
        disabled={loading}
        className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
      >
        <ImageUp />
        {loading ? "Uploading..." : "Upload"}
      </button>
    ) : (
      <p className="text-[20px] font-semibold text-red-500">
        Choose a File To Upload
      </p>
    )}

    <br />
  </div>
  )
}

export default UploadImage
