import { h } from 'preact';
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import Github from './../assets/001-github.svg'
import underWave from './../assets/underwave.png'
import GitHubButton from 'react-github-btn'

import Logo from './logo';
import light from './../assets/3-01.svg'
import dark from './../assets/4-01.svg'
import './../styles/nav.css';

function Navbar({ isDark, toggleDarkMode, color }) {
  return (
    <div className="fixed z-20 flex items-center justify-between w-full h-16 bg-white shadow-lg dark:bg-darkish-black dark:text-white">
      <div className="flex items-center px-3 mx-3 font-sans text-lg font-bold nav-item max-h-16">
        <img src={isDark ? dark : light} alt="" width="80"/>
        <div className="relative logo-name">
        <span className="text-black nav-logo dark:text-white"> Svg </span>
        <span className="text-black nav-logo dark:text-white"> Wave </span>
      
        </div>
      </div>
      <div className="flex items-center nav-item ">
        <div style={{marginRight: '2rem', marginTop: '0.5rem' }}>
          <GitHubButton 
            data-color-scheme={(isDark?"no-preference: light; light: light; dark: dark;":"")}
            data-color-scheme={`no-preference: light; light: light; dark: ${isDark? 'dark': 'light'};`}
            href="https://github.com/anup-a/svgwave" 
            data-size="large" 
            data-show-count="true"
            aria-label="Star anup-a/svgwave on GitHub">Star
          </GitHubButton>
        </div>
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
