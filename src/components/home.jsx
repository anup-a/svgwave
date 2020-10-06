import React, { useState } from 'react'
import Canvas from './canvas'
import CustomBar from './customBar'

function Home() {
  const [bgColor, setBgColor] = useState('#0099ff33')

  const [wave, setWave] = useState({
    height: 400,
    width: 1440,
    segmentCount: 4,
    layerCount: 2,
    variance: 0.75,
    strokeWidth: 0,
    fillColor: '#0099ff',
    strokeColor: 'none',
  })

  const handleWaveConfig = (waveData) => {
    setWave({
      ...wave,
      ...waveData,
    })
  }

  const changeBG = (color) => {
    color = color + '33'
    setBgColor(color)
  }

  return (
    <div
      className="flex items-center justify-center h-screen py-5"
      style={{ backgroundColor: bgColor }}
    >
      <Canvas waveConfig={wave} />
      <CustomBar
        waveConfig={wave}
        handleWaveConfig={handleWaveConfig}
        handleBGchange={changeBG}
      />
    </div>
  )
}

export default Home
