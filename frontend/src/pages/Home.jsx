import React, { useState } from 'react'
import UploadImage from '../componenets/UploadImage';
import GetImage from '../componenets/GetImage';


function Home() {

  const [reload, setReload] = useState(false)

  const reloadEffect = () => {
    setReload(!reload)
  }

  return (
    <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 ">
      <UploadImage reloadEffect={reloadEffect}/>
      <GetImage reload={reload}/>
    </div>
  )
}

export default Home
