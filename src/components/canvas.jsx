import React, { useRef } from 'react'
import SVGCode from './svgCode'

function Canvas({ svg }) {
  return (
    <div className="relative z-10 w-4/5 overflow-hidden bg-white sm:shadow-lg sm:rounded-md sm:m-5 sm:w-7/10 md:w-3/5 h-1/5 sm:h-4/5 dark:bg-darkish-black dark:text-white">
      <h1 className="hidden w-full p-6 font-sans text-4xl font-extrabold text-center opacity-75 sm:block">
        Generate SVG Waves 🌊
      </h1>
      <div className="absolute bottom-0 w-full transition-all duration-300 ease-in-out delay-150">
        {svg}
      </div>
    </div>
  )
}

export default Canvas
