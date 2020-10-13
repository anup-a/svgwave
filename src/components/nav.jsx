import React from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import Github from './../assets/001-github.svg'
import underWave from './../assets/underwave.png'

import Logo from './logo';
import light from './../assets/1-01.svg'
import dark from './../assets/2-01.svg'
import './../styles/nav.css';

function Navbar({ isDark, toggleDarkMode, color }) {
  return (
    <div className="fixed flex items-center justify-between w-full h-16 bg-white shadow-lg dark:bg-darkish-black dark:text-white">
      <div className="flex items-center px-3 mx-3 font-sans text-lg font-bold nav-item max-h-16">
        {/* <Logo color={color} /> */}
        <img src={isDark ? dark : light} alt="" width="80px"/>
        <div className="relative logo-name">
        <span className="font-bold text-black nav-logo dark:text-white"> Svg </span>
        <span className="font-bold text-black nav-logo dark:text-white"> Wave </span>
      
        </div>
      </div>
      <div className="flex items-center nav-item ">
        <a href="https://github.com/anup-a/svgwave">
        <img
          src={Github}
          alt="Github logo"
          width="30"
          style={{ filter: isDark ? 'invert(1)' : '', marginRight: '2rem' }}
        />
        </a>
        
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
