import { useState, useEffect } from 'preact/hooks'
import './../styles/sideBar.css'
import { HEIGHT_ARR } from '../constants'
import ColorTool from './colorTool'
import { ReactComponent as Flip } from './../assets/001-flip.svg'
import frame from './../assets/Frame.png' //Frame.png
import darkFrame from './../assets/100.png'

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
  const [flip, setFlip] = useState(true)
  const [height, setHeight] = useState(2)
  const [animateWave, setAnimateWave] = useState(false)

  useEffect(() => {
    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
      animated: animateWave,
    })
  }, [segmentCount, layerCount, height, animateWave])

  const regenerate = () => {
    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
      animated: animateWave,
    })
  }

  // useEffect(() => {
  //   svgOutputRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [animate])

  const handleFlipWave = () => {
    setFlip(!flip)
    handleWaveTransform()
  }

  const handleAnimateWave = () => {
    setAnimateWave((animateWave) => !animateWave)
  }

  return (
    <div className="z-10 flex flex-col items-center w-3/4 h-full mt-4 bg-white sm:rounded-lg sm:m-5 sm:w-2/5 lg:w-1/4 xl:w-1/5 sm:h-full custom-bar dark:bg-darkish-black dark:text-white">
      <div className="flex-1 p-4 pt-8">
        <div className="flex flex-col ">
          <div className="px-4 md:px-2">
            <label htmlFor="waves" className="text-md">
              <h5>Waves</h5>
            </label>
            <input
              className="w-full mt-2 mb-4 bg-gray-400 rounded-lg appearance-none"
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
          <div className="px-4 md:px-2 layers-section">
            <label htmlFor="layers" className="text-md">
              <h5>Layers</h5>
            </label>
            <input
              className="w-full mt-2 mb-4 bg-gray-400 rounded-lg appearance-none"
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
          <div className="px-4 md:px-2">
            <label htmlFor="waves" className="text-md">
              <h5>Height</h5>
            </label>
            <input
              className="w-full mt-2 mb-4 bg-gray-400 rounded-lg appearance-none "
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
        <div className="flex justify-center py-2 mb-6 text-center buttons-section">
          <button
            className="flex items-center w-2/5 h-10 px-4 py-2 m-1 border-2 rounded-lg justify-evenly border-light-grey sm:h-8 md:h-10 roll-btn"
            onClick={handleFlipWave}
          >
            <p className="mr-3">Flip</p>
            <Flip
              className={`h-4 w-4 dark:text-white ${
                flip ? 'flipdown' : 'flipup'
              }`}
            />
          </button>
          <div class="group">
            <span class="tooltip-text bg-gray-600 text-white -mt-4 -ml-1 rounded hidden group-hover:block absolute text-xs text-center py-1 px-6 z-50">
              Beta - works only in chrome
            </span>
            <button
              className="flex items-center w-full h-10 px-4 py-2 m-1 border-2 rounded-lg justify-evenly border-light-grey sm:h-8 md:h-10 roll-btn"
              onClick={handleAnimateWave}
            >
              <p className="mr-3">Animate</p>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.97549C2.33333 1.97549 5.9 -2.22451 9.5 4.97549C13.1 12.1755 16.3333 7.97549 17.5 4.97549"
                  stroke="currentColor"
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

        <button
          className="flex items-center justify-center w-full h-12 p-2 mt-6 text-white bg-black rounded-lg dark:bg-dark-highlight sm:h-8 md:h-10 lg:h-12 roll-btn"
          onClick={() => regenerate()}
        >
          <p className="mr-4">Generate</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-target"
          >
            <circle cx="12" cy="12" r="10" className="animate-target"></circle>
            <circle cx="12" cy="12" r="6" className="animate-target"></circle>
            <circle cx="12" cy="12" r="2" className="animate-target"></circle>
          </svg>{' '}
        </button>
      </div>
      <div
        className="flex flex-col w-full p-2 pt-6 pb-8 mt-2 rounded-lg"
        style={{
          backgroundImage: `url(${!isDark ? frame : darkFrame})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <p className="px-4 pb-4">Export</p>
        <div className="relative flex pt-2 mt-2 justify-evenly btn-grp">
          <button
            className="px-4 py-1 bg-white rounded-md cursor-pointer text-md export-svg dark:text-black"
            onClick={() => exportSVG()}
          >
            SVG
          </button>
          <button
            className={
              animateWave
                ? 'px-4 py-1 text-md bg-white rounded-md export-png dark:text-black'
                : 'px-4 py-1 text-md bg-white rounded-md cursor-pointer export-png dark:text-black'
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
