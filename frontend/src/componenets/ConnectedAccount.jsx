import React from 'react'
import { UseWeb3Context } from '../contexts/UseWeb3Context'

function ConnectedAccount() {

    const {web3State} = UseWeb3Context();
    const {selectedAccount} = web3State;

  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between md:px-10">
        <p className="font-semibold">Connected Account : {selectedAccount}</p>
    </div>
  )
}

export default ConnectedAccount
