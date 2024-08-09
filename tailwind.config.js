/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./index.html",
    require('flowbite/plugin'),
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      softBlue: '#b0e0e6',
      lightGray: '#f7f7f7',
      darkGray: '#2d2d2d',
    },
  },
  plugins: [
    
  ],
}

