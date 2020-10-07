import React from 'react'

function Navbar() {
  return (
    <div className="fixed flex items-center justify-between w-full h-16 bg-white shadow-lg">
      <div className="items-center px-3 mx-3 font-sans text-lg font-bold nav-item">
        🦚 SVG Wave kit
      </div>
      <div className="flex nav-item ">
        <p className="px-3 mx-3 text-lg cursor-pointer">Github</p>
        <p className="px-3 mx-3 text-lg cursor-pointer">Night Mode</p>
      </div>
    </div>
  )
}

export default Navbar
