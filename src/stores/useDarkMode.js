import create from 'zustand'
import { persist } from 'zustand/middleware'

const DARK = 'dark'
const LIGHT = 'light'

export const useDarkMode = create(
  persist(
    (set, get) => ({
      // default theme
      theme: LIGHT,

      setTheme: () => set({ theme: get().theme === DARK ? LIGHT : DARK }),
    }),
    { name: 'theme' },
  ),
)
