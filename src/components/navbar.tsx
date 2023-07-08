import React from 'react'
import Logo from './logo'

function Navbar() {
  return (
    <div className="flex justify-between items-center pt-4 bg-[#0D0D0D]">
      <div className='flex items-center'>
        <div className='flex items-end justify-center w-8 h-8 rounded-full overflow-hidden bg-[#F0F0F0]'><Logo /></div>
        <div className='ml-4 font-bold text-[1.5rem]'>hushpay</div>
      </div>
      <button className='rounded-lg bg-secondary text-sm font-extrabold py-2 px-4'>connect wallet</button>
    </div>
  )
}

export default Navbar