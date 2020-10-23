import { h } from 'preact'
import { useState } from 'preact/hooks'
import { gradColorNum } from '../constants'
import { TwitterPicker } from 'react-color'

function GradientPicker() {
  const [colorOne, setColorOne] = useState('rgba(0,43,220,1)')
  const [colorTwo, setColorTwo] = useState('rgba(50,222,212,1)')
  const [currentColor, setCurrentColor] = useState(gradColorNum.ONE)

  const handleColorChange = (hex) => {
    switch (currentColor) {
      case gradColorNum.ONE:
        setColorOne(hex)
        break
      case gradColorNum.TWO:
        setColorTwo(hex)
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
    />
  )
  const isOneSelected = currentColor === gradColorNum.ONE

  const colorBoxes = (
    <div className="flex w-1/2 m-0 my-3 justify-evenly">
      <div
        className={`flex items-center justify-center w-10 h-10 bg-white border-2 cursor-pointer ${
          isOneSelected && 'border-indigo-900'
        } rounded-md shadow-lg color-btn`}
        onClick={() => setCurrentColor(gradColorNum.ONE)}
      >
        <div
          className="w-8 h-8 rounded-md shadow-md"
          style={{ backgroundColor: colorOne }}
        ></div>
      </div>
      <div
        className={`flex items-center justify-center w-10 h-10 bg-white border-2 cursor-pointer ${
          !isOneSelected && 'border-indigo-900'
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
    <div className="flex items-center justify-center w-1/2 h-12 m-2 bg-white rounded-md ">
      <div
        className="w-full h-10 rounded-md shadow-md"
        style={{
          background: `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`,
        }}
      ></div>
    </div>
  )

  return (
    <div className="flex flex-col w-full bg-white shadow-lg">
      <div className="flex">
        {colorBoxes}
        {gradientBox}
      </div>
      {colorPicker}
    </div>
  )
}

export default GradientPicker
