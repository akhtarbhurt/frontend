/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs':'320px',  // extra small
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra-large screens
      },
      colors: {
        customOrange: '#EE8126', 
        customWhite: "#ffffff",
        blackRgba : "rgba(255, 255, 255, 1)"
      },
      fontFamily: {
        // Add your Google Font here
        sans: ['Roboto', 'sans-serif'],
        poppins:['Poppins']
      },
    },
  },
  plugins: [],
}