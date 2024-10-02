import { useState, useEffect } from 'preact/hooks'
import './../styles/sideBar.css'
import { HEIGHT_ARR } from '../constants'
import ColorTool from './colorTool'
import { ReactComponent as Flip } from './../assets/001-flip.svg'
import frame from './../assets/Frame.png' //Frame.png
import { ReactComponent as Chair } from './../assets/chair.svg' //Frame.png
import { ReactComponent as Boat } from './../assets/boat-like.svg' //Frame.png
import { ReactComponent as Wave } from './../assets/wave-icon.svg' //Frame.png
import darkFrame from './../assets/100.png'

const modes = {
  classic: <Wave className={`h-6 w-6 dark:text-white`} />,
  chairLeft: <Chair className={`h-6 w-6 dark:text-white`} />,
  chairRight: <Chair className={`h-6 w-6 dark:text-white -scale-x-100`} />,
  boat: <Boat className={`h-6 w-6 dark:text-white -scale-y-100`} />,
  invertedBoat: <Boat className={`h-6 w-6 dark:text-white`} />,
}

function CustomBar({
  onWaveConfig,
  onBGChange,
  exportSVG,
  exportPNG,
  exportWebP,
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
  const [activeMode, setActiveMode] = useState('classic')

  useEffect(() => {
    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
      animated: animateWave,
      activeMode: activeMode,
    })
  }, [segmentCount, layerCount, height, animateWave, activeMode])

  const regenerate = () => {
    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
      animated: animateWave,
      activeMode: activeMode,
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
    <div className="z-10 flex flex-col items-center w-3/4 h-full bg-white sm:m-5 xs:mt-12 md:mt-4 sm:rounded-lg sm:w-2/5 lg:w-1/4 xl:w-1/5 sm:h-full custom-bar dark:bg-darkish-black dark:text-white">
      <div className="flex-1 p-4 pt-7">
        <div className="flex flex-col gap-4 my-4">
          <div className="px-4 md:px-2 flex gap-4 items-center">
            <label htmlFor="waves" className="text-md">
              <h5>Waves</h5>
            </label>
            <input
              className="w-full bg-gray-400 rounded-lg appearance-none"
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
          <div className="px-4 md:px-2 layers-section flex gap-4 items-center">
            <label htmlFor="layers" className="text-md">
              <h5>Layers</h5>
            </label>
            <input
              className="w-full bg-gray-400 rounded-lg appearance-none"
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
          <div className="px-4 md:px-2 flex gap-4 items-center">
            <label htmlFor="waves" className="text-md">
              <h5>Height</h5>
            </label>
            <input
              className="w-full bg-gray-400 rounded-lg appearance-none "
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
          {Object.entries(modes).map(([name, icon]) => (
            <button
              className={`flex items-center w-2/5 h-8 px-1 m-1 border-2 rounded-lg justify-evenly ${
                activeMode === name && 'bg-light-grey dark:bg-slate-600'
              }  border-light-grey dark:border-slate-600 sm:h-8 roll-btn`}
              onClick={() => setActiveMode(name)}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="flex justify-center py-2 mb-4 text-center buttons-section">
          <button
            className="flex items-center w-2/5 h-10 px-4 py-2 m-1 border-2 rounded-lg justify-evenly border-light-grey dark:border-slate-600 sm:h-8 md:h-10 roll-btn"
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
            <button
              className="flex items-center w-full h-10 px-4 py-2 m-1 border-2 rounded-lg justify-evenly border-light-grey dark:border-slate-600 sm:h-8 md:h-10 roll-btn"
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
          className="flex hover:bg-black/80 items-center justify-center w-full h-8 p-2 mt-4 text-white bg-black rounded-lg dark:bg-dark-highlight hover:dark:bg-dark-highlight/80 sm:h-8 md:h-10 lg:h-12 roll-btn"
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
        className="flex flex-col w-full px-2 py-6 mt-2 rounded-lg"
        style={{
          backgroundImage: `url(${!isDark ? frame : darkFrame})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <p className="px-4 pb-2">Export</p>
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
          <button
            className="px-4 py-1 bg-white rounded-md cursor-pointer text-md export-svg dark:text-black"
            onClick={() => exportWebP()}
          >
            webp
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomBar