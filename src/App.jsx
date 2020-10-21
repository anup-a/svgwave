import { h } from 'preact';
import Home from './components/home'
import { useDarkModeState }  from './hooks/useDarkMode'
import './styles/main.css'

function App() {
  const [isDark, setIsDark] = useDarkModeState()
  
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
