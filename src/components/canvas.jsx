import React from 'react'
import { waveInit } from '../wave'

function Canvas({ waveConfig }) {
  const waveSvg = waveInit(waveConfig)
  const { height, width, xmlns, path } = waveSvg.svg
  const { d, fill, strokeColor, strokeWidth } = path[0]

  const svg = (
    <svg
      viewBox="0 0 1440 400"
      xmlns={xmlns}
      className="transition duration-300 ease-in-out delay-150"
    >
      <path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
        className="transition-all duration-300 ease-in-out delay-150"
      ></path>
    </svg>
  )

  return (
    <div className="relative w-3/5 m-5 overflow-hidden bg-white rounded-md h-4/5">
      <div className="absolute bottom-0 w-full transition-all duration-300 ease-in-out delay-150">
        {svg}
      </div>
    </div>
  )
}

export default Canvas
