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
        background:'#101010',
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

