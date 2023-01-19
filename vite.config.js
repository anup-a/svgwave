import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [preact(), svgr()],
})
