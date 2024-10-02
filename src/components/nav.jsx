import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useWindowDimensions from '../utils/useWindowDimensions'

import { ReactComponent as Light } from './../assets/3-01.svg'
import { ReactComponent as Dark } from './../assets/4-01.svg'
import { ReactComponent as CoffeeLogo } from './../assets/coffee-transparent.svg'
import { ReactComponent as GithubLogo } from './../assets/github.svg'
import { ReactComponent as TwitterLogo } from './../assets/twitter.svg'

import './../styles/nav.css'

function Navbar({ isDark, toggleDarkMode, color, scrolled }) {
  return (
    <div
      className={`${
        scrolled ?
          'fixed top-0 left-0 z-10 bg-white dark:bg-gray-800 shadow flex items-center justify-between w-full h-16 dark:text-white transition-all duration-300'
          : 'z-10 flex items-center justify-between w-full h-16 m-2 dark:text-white transition-all duration-300'
      }`}
    >
      <div className="flex items-center px-1 mx-1 font-sans text-lg font-bold nav-item max-h-16 sm:mx-3 sm:px-3">
        <h3 className="relative logo-name text-md">
          <span className="text-black nav-logo dark:text-white">Svg </span>
          <span className="text-black nav-logo dark:text-white"> Wave</span>
        </h3>
        {isDark ? <Dark width={60} /> : <Light width={60} />}
      </div>
      <div className="flex items-center h-4 gap-8 nav-item">
        <a
          class="buy-coffee"
          href="https://www.buymeacoffee.com/anup"
          target="_blank"
        >
          <CoffeeLogo height={24} />
        </a>

        <a href="https://github.com/anup-a/svgwave" target="_blank">
          <GithubLogo />
        </a>
        <a
          className="twitter-icon"
          href="https://twitter.com/intent/tweet?text=Try%20this%20cool%20website%20to%20generate%20svg%20waves!%20&#128293;%0ahttps://svgwave.in"
          target="_blank"
        >
          <TwitterLogo />
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