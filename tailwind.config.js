const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './app/views/**/*.html.erb',
      './app/views/**/*.slim',
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js',
      './app/javascript/src/**/*.vue',
    ],
    options: {
      keyframes: true,
      fontFace: true,
      defaultExtractor: content => content.match(/[^<>"\.'`\s]*[^<>"\.'`\s:]/g) || []
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
