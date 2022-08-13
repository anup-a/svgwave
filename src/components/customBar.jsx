import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './../styles/sideBar.css'
import Water from './../assets/001-water.svg'
import { HEIGHT_ARR } from '../constants'
import ColorTool from './colorTool'
import Flip from './../assets/001-flip.svg'

function CustomBar({
  onWaveConfig,
  onBGChange,
  exportSVG,
  exportPNG,
  isDark,
  onGradColorsChange,
  onGradientToggle,
  gradient,
  gradColors,
  handleWaveTransform,
  setGradAngle,
  gradAngle,
  svgOutputRef,
}) {
  const [segmentCount, setSegmentCount] = useState(5)
  const [layerCount, setLayoutCount] = useState(3)
  const [animate, setAnimate] = useState(false)
  const [flip, setFlip] = useState(true)
  const [height, setHeight] = useState(2)
  const [animateWave, setAnimateWave] = useState(false)

  useEffect(() => {
    if (animate) return

    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
      animated: animateWave,
    })
  }, [segmentCount, layerCount, height, animate, animateWave])

  useEffect(() => {
    svgOutputRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [animate])

  const handleFlipWave = () => {
    setFlip(!flip)
    handleWaveTransform()
  }

  const handleAnimateWave = () => {
    setAnimateWave((animateWave) => !animateWave)
  }

  return (
    <div className="z-10 flex flex-col items-center w-4/5 h-full px-5 py-1 mt-4 bg-white sm:p-5 sm:shadow-lg sm:rounded-md sm:m-5 sm:w-3/10 md:w-1/5 sm:h-full custom-bar xs:justify-evenly dark:bg-darkish-black dark:text-white">
      <div className="flex flex-col w-4/5">
        <div className="text-center waves-section">
          <label
            htmlFor="waves"
            className="text-sm tracking-widest text-center uppercase"
          >
            <h5>Waves</h5>
          </label>
          <input
            className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
            value={segmentCount}
            onChange={(e) => setSegmentCount(e.target.value)}
            type="range"
            id="waves"
            name="waves"
            min="1"
            max="20"
            step="1"
          />
        </div>
        <div className="text-center layers-section">
          <label
            htmlFor="layers"
            className="text-sm tracking-widest text-center uppercase"
          >
            <h5>Layers</h5>
          </label>
          <input
            className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
            value={layerCount}
            onChange={(e) => setLayoutCount(e.target.value)}
            type="range"
            id="layers"
            name="layers"
            min="2"
            max="5"
            step="1"
          />
        </div>
        <div className="text-center waves-section">
          <label
            htmlFor="waves"
            className="text-sm tracking-widest text-center uppercase"
          >
            <h5>Height</h5>
          </label>
          <input
            className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="range"
            id="height"
            name="height"
            min={0}
            max={3}
            step="1"
          />
        </div>
      </div>
      <div className="flex justify-center py-2 text-center buttons-section">
        <button className="w-12 h-12 p-2 m-3 bg-blue-100 rounded-full sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 roll-btn">
          <img
            src={Water}
            className={animate && 'reroll'}
            alt="Wave logo - randomize"
            onClick={() => setAnimate(true)}
            onAnimationEnd={() => setAnimate(false)}
          />
        </button>
        <button className="w-12 h-12 p-2 pl-3 m-3 bg-blue-100 rounded-full sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 roll-btn">
          <img
            src={Flip}
            className={`${flip ? 'flipdown' : 'flipup'}`}
            alt="Flip Wave"
            onClick={handleFlipWave}
          />
        </button>
        <div class="group">
          <span class="tooltip-text bg-gray-600 text-white -mt-4 -ml-1 rounded hidden group-hover:block absolute text-xs text-center py-1 px-6 z-50">
            Beta - works only in chrome
          </span>
          <button
            className={`m-3 w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full overflow-hidden`}
            onClick={handleAnimateWave}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="5 0 80 60"
              className="waveImg"
            >
              <path
                className="wave"
                style={{
                  animation:
                    !animateWave && 'moveTheWave 3400ms linear infinite',
                  strokeDasharray: '0 16 101 16',
                  strokeWidth: '.5rem',
                }}
                fill="none"
                stroke="#4963E3"
                strokeWidth="3"
                strokeLinecap="round"
                d="M 0 37.5 c 7.684299348848887 0 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15"
              />
            </svg>
          </button>
        </div>
      </div>

      <ColorTool
        onBGChange={onBGChange}
        isDark={isDark}
        onGradColorsChange={onGradColorsChange}
        onGradientToggle={onGradientToggle}
        gradient={gradient}
        gradColors={gradColors}
        setGradAngle={setGradAngle}
        gradAngle={gradAngle}
      />

      <div className="flex flex-col w-full mt-2">
        <p className="text-sm tracking-widest text-center uppercase ">Export</p>
        <div className="relative flex pt-2 mt-2 justify-evenly btn-grp">
          <button
            className="px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-svg dark:text-black"
            onClick={() => exportSVG()}
          >
            SVG
          </button>
          <button
            className={
              animateWave
                ? 'px-2 py-1 text-sm bg-gray-100 border-gray-100 rounded-md export-png dark:text-black'
                : 'px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-png dark:text-black'
            }
            onClick={() => exportPNG()}
            disabled={animateWave}
            style={{ cursor: animateWave ? 'not-allowed' : 'pointer' }}
          >
            PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomBar
