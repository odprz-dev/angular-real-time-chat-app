module.exports = {
  purge:{
    enable: true,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  theme: {
    extend: {},

  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursornotallowed: ['disabled']
  },
  plugins: [],
}
