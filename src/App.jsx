import { h } from 'preact'
import Home from './components/home'
import { useDarkMode } from './stores/useDarkMode'
import './styles/main.css'

function App() {
  const { theme, setTheme } = useDarkMode(({ theme, setTheme }) => ({
    theme,
    setTheme,
  }))

  const currentTheme = theme === 'dark' ? true : false

  return (
    <div className={`main-container ${currentTheme && 'dark-mode'}`}>
      <Home isDark={currentTheme} toggleDarkMode={setTheme} />
    </div>
  )
}

export default App
