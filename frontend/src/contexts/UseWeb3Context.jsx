import { useContext } from "react";
import { Web3Context } from "./CreateWeb3Context";

export const UseWeb3Context = () => {
    return useContext(Web3Context)
}