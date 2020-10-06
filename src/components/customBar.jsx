import React, { useState } from 'react'
import './../styles/sideBar.css'
import Water from './../assets/001-water.svg'
import { TwitterPicker } from 'react-color'
import { HEIGHT_ARR } from '../constants'

function CustomBar({ handleWaveConfig, handleBGchange, exportSVG }) {
  const [waves, setWaves] = useState(5)
  const [layer, setLayer] = useState(2)
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

  return (
    <div className="flex flex-col items-center w-1/5 p-5 m-5 bg-white rounded-md h-4/5 custom-bar justify-evenly">
      <input
        className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
        value={waves}
        onChange={handleChange}
        type="range"
        id="points"
        name="points"
        min="1"
        max="20"
        step="1"
      />
      <input
        className="w-full h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none"
        value={layer}
        onChange={handleLayerChange}
        type="range"
        id="points"
        name="points"
        min="2"
        max="5"
        step="1"
      />
      <button className="p-2 m-5 bg-blue-100 rounded-full roll-btn">
        <img
          src={Water}
          className={animate && 'reroll'}
          alt="Wave logo"
          onClick={handleRandomWave}
          onAnimationEnd={() => setAnimate(false)}
        />
      </button>

      <TwitterPicker color={color} onChangeComplete={handleColorChange} />

      <div className="btn-grp">
        <p>Export</p>
        <button className="export-svg" onClick={handleExportSvg}>
          SVG
        </button>
        {/* <div className="export-png" onClick={handleExportPng}>
          PNG
        </div> */}
      </div>
    </div>
  )
}

export default CustomBar
