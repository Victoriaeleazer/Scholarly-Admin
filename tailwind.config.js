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
        background:'rgb(31,31,31)',
        tertiary:'#101010',
        secondary:'#9ca3af'
      },
      borderRadius:{
        circle: '50%',
        corner:'5%'
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.clip-star': {// Default color
          clipPath: `polygon(
            50% 0%, 61% 35%, 98% 35%, 
            68% 57%, 79% 91%, 
            50% 70%, 
            21% 91%, 32% 57%, 
            2% 35%, 39% 35%
          )`,
        },
        '.clip-triangle': {// Default color
          clipPath: `polygon(50% 0%, 0% 100%, 100% 100%)`,
        },
        '.ease': {// Default color
          transitionTimingFunction:'ease',
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        '.scholarly-scrollbar::-webkit-scrollbar': {
          width: '5px',
        },
        '.scholarly-scrollbar::-webkit-scrollbar-track': {
          background: 'transparent',
          'border-radius': '10px',
        },
        '.scholarly-scrollbar::-webkit-scrollbar-thumb': {
          background: '#101010',
          'border-radius': '10px',
        },
        '.scholarly-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#101010',

        },
      }, ['responsive', 'hover']);
    },
  ],
}

