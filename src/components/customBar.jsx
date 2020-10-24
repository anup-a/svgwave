import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './../styles/sideBar.css'
import Water from './../assets/001-water.svg'
import { HEIGHT_ARR } from '../constants'
import ColorTool from './colorTool'

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
}) {
  const [segmentCount, setSegmentCount] = useState(5)
  const [layerCount, setLayoutCount] = useState(3)
  const [animate, setAnimate] = useState(false)
  const [height, setHeight] = useState(2)

  useEffect(() => {
    if (animate) return

    onWaveConfig({
      segmentCount,
      layerCount,
      height: HEIGHT_ARR[height],
    })
  }, [segmentCount, layerCount, height, animate])

  return (
    <div className="z-10 flex flex-col items-center w-4/5 px-5 py-1 mt-4 bg-white sm:p-5 sm:shadow-lg sm:rounded-md sm:m-5 sm:w-3/10 md:w-1/5 h-3/5 sm:h-4/5 custom-bar xs:justify-evenly dark:bg-darkish-black dark:text-white">
      <div className="flex flex-col">
        <div className="text-center waves-section">
          <label
            htmlFor="waves"
            className="text-sm tracking-widest text-center uppercase"
          >
            Waves
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
            Layers
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
            Height
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

      <button className="p-2 m-5 bg-blue-100 rounded-full roll-btn">
        <img
          src={Water}
          className={animate && 'reroll'}
          alt="Wave logo"
          onClick={() => setAnimate(true)}
          onAnimationEnd={() => setAnimate(false)}
        />
      </button>

      <ColorTool
        onBGChange={onBGChange}
        isDark={isDark}
        onGradColorsChange={onGradColorsChange}
        onGradientToggle={onGradientToggle}
        gradient={gradient}
        gradColors={gradColors}
      />

      <div className="flex flex-col w-full mt-2">
        <p className="text-sm tracking-widest text-center uppercase ">Export</p>
        <div className="flex pt-2 mt-2 justify-evenly btn-grp">
          <button
            className="px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-svg dark:text-black"
            onClick={() => exportSVG()}
          >
            SVG
          </button>
          <button
            className="px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-png dark:text-black"
            onClick={() => exportPNG()}
          >
            PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomBar
