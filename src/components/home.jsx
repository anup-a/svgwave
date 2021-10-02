import { h } from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'
import Canvas from './canvas'
import CustomBar from './customBar'
import Navbar from './nav'
import { waveInit } from '../core'
import { OPACITY_ARR, MAX_WAVES } from './../constants'
import SVGCode from './svgCode'
import saveSvgAsPng from 'save-svg-as-png'

function Home({ isDark, toggleDarkMode }) {
  const [bgColor, setBgColor] = useState('#ff0080')
  const [showModal, setShowModal] = useState(false)
  const [gradient, setGradient] = useState(true)
  const [invert, setInvert] = useState(false)
  const [gradColors, setGradColors] = useState({
    colorOne: '#002bdc',
    colorTwo: '#32ded4',
  })
  const [gradAngle, setGradAngle] = useState(0)

  const svgElement = useRef(null)
  const bgSvgElement = useRef(null)

  const [wave, setWave] = useState({
    height: 500,
    width: 1440,
    segmentCount: 4,
    layerCount: 3,
    variance: 0.75,
    strokeWidth: 0,
    fillColor: '#ff0080',
    strokeColor: 'none',
    animated: false,
  })

  const [waveSvg, setWaveSvg] = useState(() => waveInit(wave))

  useEffect(() => {
    setWaveSvg(waveInit(wave))
  }, [wave])

  const { height, xmlns, path, animatedPath } = waveSvg.svg
  const num_waves = path.length
  const opac = OPACITY_ARR.slice(MAX_WAVES - num_waves)
  const cw = waveSvg.svg.width / 2
  const ch = waveSvg.svg.height / 2
  const transformData = `rotate(-180 ${cw} ${ch})`

  const svg = (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox={`0 0 1440 ${height}`}
      xmlns={xmlns}
      ref={svgElement}
      className="transition duration-300 ease-in-out delay-150"
    >
      {path.map((p, index) => {
        const pathProps = []

        if (p.animatedPath) {
          pathProps.push(
            <style>{`
          .path-${index}{
            animation:pathAnim-${index} 4s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-${index}{
            0%{
              d: path("${p.d}");
            }
            25%{
              d: path("${p.animatedPath[0]}");
            }
            50%{
              d: path("${p.animatedPath[1]}");
            }
            75%{
              d: path("${p.animatedPath[2]}");
            }
            100%{
              d: path("${p.d}");
            }
          }`}</style>,
          )
        }

        if (gradient) {
          const anglePI = gradAngle * (Math.PI / 180)
          pathProps.push(
            <defs>
              <linearGradient
                id={`gradient`}
                x1={Math.round(50 + Math.sin(anglePI) * 50) + '%'}
                y1={Math.round(50 + Math.cos(anglePI) * 50) + '%'}
                x2={Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%'}
                y2={Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'}
              >
                <stop
                  offset="5%"
                  stop-color={`${gradColors.colorOne}${opac[index]}`}
                />
                <stop
                  offset="95%"
                  stop-color={`${gradColors.colorTwo}${opac[index]}`}
                />
              </linearGradient>
            </defs>,
          )
        }

        pathProps.push(
          <path
            key={index}
            d={p.d}
            stroke={p.strokeColor}
            strokeWidth={p.strokeWidth}
            fill={gradient ? `url(#gradient)` : `${bgColor}${opac[index]}`}
            className={`transition-all duration-300 ease-in-out delay-150 path-${index}`}
            transform={invert ? transformData : p.transform}
          ></path>,
        )

        return pathProps
      })}
    </svg>
  )

  const bgSvg = (
    <svg
      height="100%"
      width="100%"
      id="bg-svg"
      viewBox={`0 0 1440 ${height}`}
      xmlns={xmlns}
      ref={bgSvgElement}
      className="transition duration-300 ease-in-out delay-150"
    >
      {path.map((p, index) => {
        const anglePI = gradAngle * (Math.PI / 180)
        return gradient ? (
          [
            <defs>
              <linearGradient
                id={`gradient`}
                x1={Math.round(50 + Math.sin(anglePI) * 50) + '%'}
                y1={Math.round(50 + Math.cos(anglePI) * 50) + '%'}
                x2={Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%'}
                y2={Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'}
              >
                <stop
                  offset="5%"
                  stop-color={`${
                    invert ? gradColors.colorTwo : gradColors.colorOne
                  }${opac[index]}`}
                />
                <stop
                  offset="95%"
                  stop-color={`${
                    invert ? gradColors.colorOne : gradColors.colorTwo
                  }${opac[index]}`}
                />
              </linearGradient>
            </defs>,
            <path
              key={index}
              d={p.d}
              stroke={p.strokeColor}
              strokeWidth={p.strokeWidth}
              fill={gradient ? `url(#gradient)` : `${bgColor}${opac[index]}`}
              className="transition-all duration-300 ease-in-out delay-150"
              transform={p.transform}
            ></path>,
          ]
        ) : (
          <path
            key={index}
            d={p.d}
            stroke={p.strokeColor}
            strokeWidth={p.strokeWidth}
            fill={gradient ? 'url(#gradient)' : `${bgColor}${opac[index]}`}
            className="transition-all duration-300 ease-in-out delay-150"
            transform={p.transform}
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

  const handleWaveTransform = () => {
    setInvert(!invert)
    setWaveSvg(waveInit(wave))
  }

  const handleBGChange = (color) => {
    bgColor !== color && setBgColor(color)
  }

  const handleExportSVG = () => {
    setShowModal(!showModal)
  }

  const handleExportPNG = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('svg'), 'svg.png')
  }

  return (
    <div className="relative h-screen dark:bg-darkish-black">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} color={bgColor} />
      <div
        className="flex flex-col items-center justify-center h-screen p-0 dark:bg-darkish-black "
        style={{
          background: isDark
            ? '#131e2b66'
            : gradient
            ? `linear-gradient(${gradAngle}deg, ${gradColors.colorOne}33 0%, ${gradColors.colorTwo}33 100%)`
            : `${bgColor}33`,
        }}
      >
        <div className="absolute bottom-0 w-full opacity-25 bg-svg">
          {bgSvg}
        </div>
        {showModal && (
          <SVGCode
            code={svgElement.current.outerHTML}
            toggleModal={handleExportSVG}
          />
        )}
        <div className="flex flex-col-reverse items-center justify-center w-full h-full pt-5 pb-0 center-container md:flex-row ">
          <Canvas svg={svg} invert={invert} />
          <CustomBar
            handleWaveTransform={handleWaveTransform}
            waveConfig={wave}
            onWaveConfig={handleWaveConfig}
            onBGChange={handleBGChange}
            onGradColorsChange={setGradColors}
            onGradientToggle={setGradient}
            exportSVG={handleExportSVG}
            exportPNG={handleExportPNG}
            isDark={isDark}
            gradient={gradient}
            gradColors={gradColors}
            gradAngle={gradAngle}
            setGradAngle={setGradAngle}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
