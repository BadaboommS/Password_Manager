import React from 'react'
import { Outlet } from 'react-router'
//import Nav

const ALayout = () => {

  return (
    <div className='fixed w-screen h-screen top-0 left-0 overflow-y-scroll no-scrollbar'>
        {/*Nav bar component here*/}
        <div className="flex flex-col pl-0 md:pl-16 pt-16 md:pt-0 w-screen min-h-full bg-gray-700 text-white">
          <Outlet />
        </div>
    </div>
  )
}

export default ALayout