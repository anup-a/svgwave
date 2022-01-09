import { h } from 'preact'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import GitHubButton from 'react-github-btn'
import useWindowDimensions from '../utils/useWindowDimensions'

import light from './../assets/3-01.svg'
import dark from './../assets/4-01.svg'
import launchImg from './../assets/launch.png'
import githubSmallIcon from "./../assets/gh_small.svg";
import twitterIcon from "./../assets/twitter.png";

import './../styles/nav.css'

function Navbar({ isDark, toggleDarkMode, color }) {
  const { height, width } = useWindowDimensions();

  return (
    <div className="fixed z-20 flex items-center justify-between w-full h-16 bg-white shadow-lg dark:bg-darkish-black dark:text-white">
      <div className="flex items-center px-1 mx-1 font-sans text-lg font-bold nav-item max-h-16 sm:mx-3 sm:px-3">
        <img src={isDark ? dark : light} alt="" width={width < 600 ? "60" : "80"} />
        <div className="relative logo-name">
          <span className="text-black nav-logo dark:text-white text-sm sm:text-md"> Svg </span>
          <span className="text-black nav-logo dark:text-white text-sm sm:text-md"> Wave </span>
        </div>
      </div>
      <div className="flex items-center nav-item ">
        <a className="launch-img" href="https://meshy.uxie.io/" target="_blank">
          <div className="launch-text font-sans">
            <p class="tab">NEW</p>
          </div>
          <div class="emoji-icon">
          <p class="hidden sm:block">🎉</p>
          </div>
          <img src={launchImg} alt="launch meshy" width="100"/>
        </a>
        <div style={{ 
          marginRight: '1rem', 
          marginTop: width < 600 ? '' : '0.5rem', 
          display: 'flex', 
          alignItems: 'center' 
          }}>
          {width < 600 ? (<a href="https://github.com/anup-a/svgwave">
            <img src={githubSmallIcon} alt="" style={{width : '1.5rem'}}/>
          </a>) : (<GitHubButton
            data-color-scheme={
              isDark ? 'no-preference: light; light: light; dark: dark;' : ''
            }
            data-color-scheme={`no-preference: light; light: light; dark: ${
              isDark ? 'dark' : 'light'
            };`}
            href="https://github.com/anup-a/svgwave"
            data-size="large"
            data-show-count="true"
            aria-label="Star anup-a/svgwave on GitHub"
          >
            Star
          </GitHubButton>)}
        </div>
        {width > 600 && (<a className="twitter-icon" href="https://twitter.com/anup2aglawe" target="_blank">
          <img src={twitterIcon} width="25" style={{marginRight: '12px'}} alt="twitter icon" />
        </a>)}
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
