/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'box-bg': 'var(--app-box-bg)',
        'app-green': 'var(--app-green)',
        'app-white': 'var(--app-white)',
        'app-aqua': 'var(--app-aqua)',
        'app-purple': 'var(--app-purple)',
        'app-black': 'var(--app-black)',
        'app-widget-dark': 'var(--app-widgets-bg)',
      },
      fontFamily: {
        'saatliches-regular': ['StaatlichesRegular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
