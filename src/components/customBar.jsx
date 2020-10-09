import React, { useState } from 'react'
import './../styles/sideBar.css'
import Water from './../assets/001-water.svg'
import { TwitterPicker } from 'react-color'
import { HEIGHT_ARR } from '../constants'

function CustomBar({ handleWaveConfig, handleBGchange, exportSVG, exportPNG }) {
  const [waves, setWaves] = useState(5)
  const [layer, setLayer] = useState(3)
  const [animate, setAnimate] = useState(false)
  const [color, setColor] = useState('#0099ff')

  const handleChange = (e) => {
    const val = e.target.value
    setWaves(val)
    handleWaveConfig({ segmentCount: val })
  }

  const handleColorChange = ({ hex }) => {
    setColor(hex)
    handleWaveConfig({ fillColor: hex })
    handleBGchange(hex)
  }

  const handleRandomWave = () => {
    setAnimate(true)
    handleWaveConfig()
  }

  const handleLayerChange = (e) => {
    const val = e.target.value
    setLayer(val)
    handleWaveConfig({ layerCount: val, height: HEIGHT_ARR[val - 2] })
  }

  const handleExportSvg = () => {
    exportSVG()
  }

  const handleExportPng = () => {
    exportPNG()
  }

  return (
    <div className="z-10 flex flex-col items-center w-1/5 p-5 m-5 bg-white rounded-md h-4/5 custom-bar justify-evenly">
      <div className="text-center waves-section">
        <label
          htmlFor="waves"
          className="text-sm tracking-widest text-center uppercase"
        >
          Waves
        </label>
        <input
          className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
          value={waves}
          onChange={handleChange}
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
          value={layer}
          onChange={handleLayerChange}
          type="range"
          id="layers"
          name="layers"
          min="2"
          max="5"
          step="1"
        />
      </div>
      <button className="p-2 m-5 bg-blue-100 rounded-full roll-btn">
        <img
          src={Water}
          className={animate && 'reroll'}
          alt="Wave logo"
          onClick={handleRandomWave}
          onAnimationEnd={() => setAnimate(false)}
        />
      </button>

      <TwitterPicker
        color={color}
        onChangeComplete={handleColorChange}
        width="100%"
      />

      <div className="flex flex-col w-full mt-2">
        <p className="text-sm tracking-widest text-center uppercase ">Export</p>
        <div className="flex pt-2 mt-2 justify-evenly btn-grp">
          <button
            className="px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-svg"
            onClick={handleExportSvg}
          >
            SVG
          </button>
          <button
            className="px-2 py-1 text-sm bg-gray-200 border-gray-200 rounded-md cursor-pointer export-png"
            onClick={handleExportPng}
          >
            PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomBar
