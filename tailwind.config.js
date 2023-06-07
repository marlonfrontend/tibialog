/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '600px',
          md: '728px',
          lg: '1024px',
          xl: '1220px'
        },
      },
      colors: {
        body: '#051022',
        primary: '#EF6160'
      }
    },
    boxShadow: {
      DEFAULT: '0 1px 5px rgba(0,0,0,0.06)',
      md: '2px 2px 8px rgba(0,0,0,0.06)',
    }
  },
  plugins: [],
}

