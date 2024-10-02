import { h } from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'
import Canvas from './canvas'
import CustomBar from './customBar'
import Navbar from './nav'
import { waveInit } from '../core'
import { OPACITY_ARR, MAX_WAVES } from './../constants'
import SVGCode from './svgCode'
import saveSvgAsPng from 'save-svg-as-png'
import './../../lib/webcomponent/float-menu'
import './../../lib/webcomponent/banner'
import Banner from './Banner'

function Home({ isDark, toggleDarkMode }) {
  const [bgColor, setBgColor] = useState('#ff0080')
  const [showModal, setShowModal] = useState(false)
  const [gradient, setGradient] = useState(true)
  const [invert, setInvert] = useState(false)
  const [gradColors, setGradColors] = useState({
    colorOne: '#F78DA7',
    colorTwo: '#8ED1FC',
  })
  const [gradAngle, setGradAngle] = useState(270)

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
    animated: false,
    activeMode: 'classic',
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
  const svgOutputRef = useRef(null)
  const svgRef = useRef(null)

  const svg = (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox={`0 0 1440 ${height - 10}`}
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
                <stop offset="5%" stopColor={`${gradColors.colorOne}`} />
                <stop offset="95%" stopColor={`${gradColors.colorTwo}`} />
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
            fill={gradient ? `url(#gradient)` : `${bgColor}`}
            fillOpacity={opac[index]}
            className={`transition-all duration-300 ease-in-out delay-150 path-${index}`}
            transform={invert ? transformData : p.transform}
          ></path>,
        )

        return pathProps
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

  const handleExporWebP = () => {
    const svgElement = svgRef.current // Get the SVG element reference

    // Create a canvas element to draw the SVG
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set canvas size to match the SVG viewBox
    canvas.width = 1440 // Width of the SVG viewBox
    canvas.height = 590 // Height of the SVG viewBox

    // Serialize the SVG to a string
    const svgString = new XMLSerializer().serializeToString(document.getElementById('svg'))

    // Create an image from the SVG string
    const img = new Image()
    img.onload = () => {
      // Draw the SVG image on the canvas
      ctx.drawImage(img, 0, 0)

      // Convert the canvas content to WebP
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        
        // Create a download link for the WebP image
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = 'svg.webp'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        
        // Clean up the object URL after download
        URL.revokeObjectURL(url)
      }, 'image/webp')
    }
    // Encode the SVG string and set the image source
    img.src = 'data:image/svg+xml;base64,' + window.btoa(svgString)
  }

  return (
    <div className="relative md:h-screen bg-light-grey dark:bg-black">
      <Banner />
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} color={bgColor} />
      <float-menu
        className="absolute z-50 block h-0 "
        style={{ top: '20%' }}
        isDark={isDark}
      ></float-menu>
      <div className="flex flex-col items-center p-0 md:h-screen bg-light-grey dark:bg-black ">
        {showModal && (
          <SVGCode
            code={svgElement.current.outerHTML}
            toggleModal={handleExportSVG}
          />
        )}
        <div className="flex flex-col-reverse items-center justify-center w-full h-4/5 center-container md:flex-row ">
          <Canvas
            svg={svg}
            invert={invert}
            isDark={isDark}
            svgOutputRef={svgOutputRef}
            ref={svgRef}
          />
          <CustomBar
            handleWaveTransform={handleWaveTransform}
            waveConfig={wave}
            onWaveConfig={handleWaveConfig}
            onBGChange={handleBGChange}
            onGradColorsChange={setGradColors}
            onGradientToggle={setGradient}
            exportSVG={handleExportSVG}
            exportPNG={handleExportPNG}
            exportWebP={handleExporWebP}
            isDark={isDark}
            gradient={gradient}
            gradColors={gradColors}
            gradAngle={gradAngle}
            setGradAngle={setGradAngle}
            svgOutputRef={svgOutputRef}
            ref={svgRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Home