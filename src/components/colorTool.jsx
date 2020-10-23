import { h } from 'preact'
import { useState } from 'preact/hooks'
import { TwitterPicker } from 'react-color'

import { colorToolMode } from '../constants'
import GradientPicker from './gradientPicker'

const twitterPickerStyle = {
  default: {
    card: {
      backgroundColor: 'hsl(210,38%,15%)',
    },
    triangle: {
      borderColor: 'transparent transparent hsl(210,38%,15%)',
    },
  },
}

function ColorTool({ onBGChange, isDark }) {
  const [colorTool, setColorTool] = useState(colorToolMode.GRADIENT)
  const [showTool, setShowTool] = useState(true)
  const [fillColor, setFillColor] = useState('#ff0080')

  const handleColorChange = (hex) => {
    setFillColor(hex)
    onBGChange(hex)
    setColorTool(colorToolMode.NONE)
  }

  const handleColorTool = (colorStatus) => {
    setColorTool(colorStatus)
  }

  const handleToggleTool = (e, colorStatus) => {
    e.stopPropagation()
    setColorTool(colorStatus)
    setShowTool(true)
  }

  const isGradient = colorTool === colorToolMode.GRADIENT

  return (
    <div className="relative flex items-center w-full justify-evenly">
      <div
        className="flex flex-col items-center justify-center w-1/2 p-3 rounded-lg cursor-pointer section"
        onClick={() => handleColorTool(colorToolMode.COLOR)}
        style={!isGradient && { background: '#edf2f7' }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-900 rounded-full shadow-lg color-btn">
          <div
            className="w-10 h-10 rounded-full shadow-md "
            onClick={(e) => handleToggleTool(e, colorToolMode.COLOR)}
            style={{ backgroundColor: fillColor }}
          ></div>
        </div>
        <div
          className="mt-3 font-semibold"
          style={isGradient && { color: '#718096' }}
        >
          Color
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center w-1/2 p-3 rounded-lg cursor-pointer section"
        onClick={() => handleColorTool(colorToolMode.GRADIENT)}
        style={isGradient && { background: '#edf2f7' }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-900 rounded-full shadow-lg color-btn">
          <div
            className="w-10 h-10 rounded-full shadow-md "
            onClick={(e) => handleToggleTool(e, colorToolMode.GRADIENT)}
            style={
              isGradient
                ? {
                    background: '#718096',
                    background:
                      'linear-gradient(90deg, rgba(0,43,220,1) 0%, rgba(50,222,212,1) 100%)',
                  }
                : {
                    background:
                      'linear-gradient(90deg, rgba(0,43,220,1) 0%, rgba(50,222,212,1) 100%)',
                  }
            }
          ></div>
        </div>
        <div
          className="mt-3 font-semibold"
          style={!isGradient && { color: '#718096' }}
        >
          Gradient
        </div>
      </div>
      {showTool && (
        <div className="absolute w-full color-tool">
          <button
            onClick={() => setShowTool(false)}
            className="absolute bottom-0 right-0 z-20 m-3"
          >
            X
          </button>
          {colorTool === colorToolMode.COLOR && (
            <TwitterPicker
              color={fillColor}
              onChangeComplete={({ hex }) => handleColorChange(hex)}
              width="100%"
              z-index="20"
              styles={isDark ? twitterPickerStyle : {}}
            />
          )}
          {colorTool === colorToolMode.GRADIENT && <GradientPicker />}
        </div>
      )}
    </div>
  )
}

export default ColorTool
