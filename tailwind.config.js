/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
