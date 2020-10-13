module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html', 
    './src/**/*.jsx'],
  },

  theme: {
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        'darkish-blue': '#182635',
        'darkish-black': '#0e141b',
      },
      width: {
        '7/10' : '70%',
        '3/10' : '30%',
      },
      screens: {
        'xs' : '362px',
      }
    },
    fontFamily: {
      sans: [
        'Poppins',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover',
      'responsive',
    ],
    borderColor: [
      'dark',
      'dark-focus',
      'dark-focus-within',
      'hover',
      'responsive',
    ],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
  },
  plugins: [
    require('tailwind-percentage-heights-plugin')(),
    require('tailwindcss-dark-mode')(),
  ],
}
