import { useState, useEffect } from "preact/hooks"

const DARK = 'dark'
const LIGHT =  'light'

export const useDarkModeState = () => {
    const [isDark, setIsDark] = useState(() => {
        const mode = localStorage.getItem('themeMode', LIGHT)
        return mode === DARK
    });

    useEffect(() => {
        localStorage.setItem('themeMode', isDark ? DARK : LIGHT)
    }, [isDark])

    return [isDark, setIsDark]
}