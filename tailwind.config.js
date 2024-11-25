/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'media',
  theme: {
    extend: {
      colors:{
        purple:'#560677',
        blue:'#628EFF',
        black: '#000000',
        background:'#0A0A0A',
        secondary:'#9ca3af'
      },
      borderRadius:{
        circle: '50%',
        corner:'5%'
      }
    },
  },
  plugins: [],
}

