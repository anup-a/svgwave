import React, { useState } from 'react'
import Home from './components/home'
import './styles/main.css'

function App() {
  const [isDark, setIsDark] = useState(false)
  const onChangeTheme = (arg) => {
    setIsDark(arg)
  }

  return (
    <div className={`main-container ${isDark && 'dark-mode'}`}>
      <Home isDark={isDark} toggleDarkMode={onChangeTheme} />
    </div>
  )
}

export default App
