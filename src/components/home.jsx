import React, { useRef, useState } from 'react'
import Canvas from './canvas'
import CustomBar from './customBar'
import Navbar from './nav'
import { waveInit } from '../wave'
import { OPACITY_ARR, MAX_WAVES } from './../constants'
import SVGCode from './svgCode'
import saveSvgAsPng from 'save-svg-as-png'

function Home({ isDark, toggleDarkMode }) {
  const [bgColor, setBgColor] = useState('#ff0080')
  const [showModal, setShowModal] = useState(false)

  const svgElement = useRef(null)

  const [wave, setWave] = useState({
    height: 500,
    width: 1440,
    segmentCount: 4,
    layerCount: 3,
    variance: 0.75,
    strokeWidth: 0,
    fillColor: '#ff0080',
    strokeColor: 'none',
  })

  const waveSvg = waveInit(wave)
  const { height, width, xmlns, path } = waveSvg.svg
  const num_waves = path.length
  const opac = OPACITY_ARR.slice(MAX_WAVES - num_waves)

  const svg = (
    <svg
      height="100%"
      width="100%"
      viewBox={`0 0 1440 ${height}`}
      xmlns={xmlns}
      ref={svgElement}
      className="transition duration-300 ease-in-out delay-150"
    >
      {path.map((p, index) => {
        return (
          <path
            key={index}
            d={p.d}
            stroke={p.strokeColor}
            strokeWidth={p.strokeWidth}
            fill={`${p.fill}${opac[index]}`}
            className="transition-all duration-300 ease-in-out delay-150"
          ></path>
        )
      })}
    </svg>
  )

  const handleWaveConfig = (waveData) => {
    setWave({
      ...wave,
      ...waveData,
    })
  }

  const changeBG = (color) => {
    color = color
    setBgColor(color)
  }

  const handleExportSVG = () => {
    setShowModal(!showModal)
  }

  const handleExportPNG = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('bg-svg'), 'svg.png')
  }

  return (
    <div className="relative h-screen dark:bg-darkish-black">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} color={bgColor}/>
      <div
        className="flex flex-col items-center justify-center h-screen p-0 dark:bg-darkish-black "
        style={{ backgroundColor: isDark ? '#131e2b66' : `${bgColor}33` }}
      >
        <div className="absolute bottom-0 w-full opacity-25 bg-svg">{svg}</div>
        {showModal && (
          <SVGCode
            code={svgElement.current.outerHTML}
            toggleModal={handleExportSVG}
          />
        )}
        <div className="flex flex-col-reverse items-center justify-center w-full h-full pt-5 pb-0 center-container md:flex-row ">
          <Canvas svg={svg} />
          <CustomBar
            waveConfig={wave}
            handleWaveConfig={handleWaveConfig}
            handleBGchange={changeBG}
            exportSVG={handleExportSVG}
            exportPNG={handleExportPNG}
            isDark={isDark}
          />
        </div>
        <div className="z-20 flex h-12 text-lg font-bold text-black footer dark:text-white">
          Made with ❤ - by <a href="https://www.anup.tech" className="ml-2 underline"> Anup</a>
        </div>

      </div>
    </div>
  )
}

export default Home
