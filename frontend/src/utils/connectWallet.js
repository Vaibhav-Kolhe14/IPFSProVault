import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";
import toast from "react-hot-toast";
import axios from 'axios'

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];
    console.log(selectedAccount);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "Welcome to Crypto Vault Website"
    const signature = await signer.signMessage(message)
    console.log("Signature is :: ",signature);
    
    const dataSignature = {
      signature
    }

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth?accountAddress=${selectedAccount}`, dataSignature)
    console.log("Response from backend url :: ", res)
    console.log("Res.data.data.Token :: ", res.data.data.Token)

    localStorage.setItem("token", res.data.data.Token)

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    return { contractInstance, selectedAccount };
  } catch (error) {
    console.log("Error in connectWallet :: ", error);
    toast.error("Wallet Connection Failed !")
  }
};
