import { h } from 'preact'
import { useState } from 'preact/hooks'
import {
  colorPickerDarkStyle,
  gradColorNum,
  gradientPickerStyle,
} from '../constants'
import { TwitterPicker } from 'react-color'

import './../styles/sideBar.css'

function GradientPicker({ gradColors, onGradColorsChange, isDark }) {
  const [colorOne, setColorOne] = useState(gradColors.colorOne)
  const [colorTwo, setColorTwo] = useState(gradColors.colorTwo)
  const [currentColor, setCurrentColor] = useState(gradColorNum.ONE)

  const handleColorChange = (hex) => {
    switch (currentColor) {
      case gradColorNum.ONE:
        setColorOne(hex)
        onGradColorsChange({
          ...gradColors,
          colorOne: hex,
        })
        break
      case gradColorNum.TWO:
        setColorTwo(hex)
        onGradColorsChange({
          ...gradColors,
          colorTwo: hex,
        })
        break
      default:
        break
    }
  }

  const colorPicker = (
    <TwitterPicker
      color={colorOne}
      onChangeComplete={({ hex }) => handleColorChange(hex)}
      width="100%"
      z-index="20"
      triangle="hide"
      styles={isDark ? colorPickerDarkStyle : gradientPickerStyle}
    />
  )
  const isOneSelected = currentColor === gradColorNum.ONE

  const colorBoxes = (
    <div className="flex w-1/2 m-0 my-3 justify-evenly">
      <div
        className={`flex items-center justify-center w-10 h-10 bg-white dark:bg-darkish-blue cursor-pointer ${
          isOneSelected && 'border-2 border-indigo-900 dark:border-white'
        } rounded-md shadow-lg color-btn`}
        onClick={() => setCurrentColor(gradColorNum.ONE)}
      >
        <div
          className="w-8 h-8 rounded-md shadow-md"
          style={{ backgroundColor: colorOne }}
        ></div>
      </div>
      <div
        className={`flex items-center justify-center w-10 h-10 bg-white dark:bg-darkish-blue cursor-pointer ${
          !isOneSelected && 'border-2 border-indigo-900 dark:border-white'
        } rounded-md shadow-lg color-btn`}
        onClick={() => setCurrentColor(gradColorNum.TWO)}
      >
        <div
          className="w-8 h-8 rounded-md shadow-md"
          style={{ backgroundColor: colorTwo }}
        ></div>
      </div>
    </div>
  )

  const gradientBox = (
    <div className="flex items-center justify-center w-1/2 h-12 m-2 rounded-md ">
      <div
        className="w-full h-10 rounded-md shadow-md"
        style={{
          background: `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`,
        }}
      ></div>
    </div>
  )

  return (
    <div className="flex flex-col w-full py-6 bg-white rounded-lg custom-shadow scale-in-center dark:bg-darkish-blue">
      <div className="flex">
        {colorBoxes}
        {gradientBox}
      </div>
      {colorPicker}
    </div>
  )
}

export default GradientPicker
