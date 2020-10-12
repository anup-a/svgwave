import React from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import Github from './../assets/001-github.svg'

function Navbar({ isDark, toggleDarkMode }) {
  return (
    <div className="fixed flex items-center justify-between w-full h-16 bg-white shadow-lg dark:bg-darkish-black dark:text-white">
      <div className="items-center px-3 mx-3 font-sans text-lg font-bold nav-item">
        🦚 SVG Wave kit
      </div>
      <div className="flex items-center nav-item">
        <img
          src={Github}
          alt="Github logo"
          width="30"
          style={{ filter: isDark ? 'invert(1)' : '', marginRight: '2rem' }}
        />
        <DarkModeSwitch
          style={{ marginRight: '2rem' }}
          checked={isDark}
          onChange={toggleDarkMode}
          size={30}
        />
      </div>
    </div>
  )
}

export default Navbar
