import React from 'react'
import { waveInit } from '../wave'
import { OPACITY_ARR, MAX_WAVES } from './../constants'

function Canvas({ waveConfig }) {
  const waveSvg = waveInit(waveConfig)
  const { height, width, xmlns, path } = waveSvg.svg
  const num_waves = path.length
  const opac = OPACITY_ARR.slice(MAX_WAVES - num_waves)

  const svg = (
    <svg
      viewBox={`0 0 1440 ${height}`}
      xmlns={xmlns}
      className="transition duration-300 ease-in-out delay-150"
    >
      {path.map((p, index) => {
        return (
          <path
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

  return (
    <div className="relative w-3/5 m-5 overflow-hidden bg-white rounded-md h-4/5">
      <div className="absolute bottom-0 w-full transition-all duration-300 ease-in-out delay-150">
        {svg}
      </div>
    </div>
  )
}

export default Canvas
