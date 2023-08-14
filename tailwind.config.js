/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        slideOutLeft: 'slideOutLeft 1s ease-in-out forwards',
        slideInRight: 'slideInRight 1s ease-in-out forwards',
        slideLeft: 'slideLeft 1s linear forwards',
        slideRight: 'slideRight 1s linear forwards'
        
      },
      keyframes: {
        navLink:
        {
          '0%': 'transform: scale(1)',
          '50%': 'transform: scale(1.25)',
          '100%': 'transform: scale(1.5)'         
        },
        slideRight: {
          '0%': {left: '-100%'},
          '50%': {left: '-50%'},
          '100%': {left: '0%'}
        },
        slideLeft: {
          '0%': {left: '0%'},
          '50%': {left: '-50%'},
          '100%': {left: '-100%'}
        }
      },
      fontSize: {
        clamp: 'clamp(20px, 1rem + 2vw, 30px)'
      },
      colors: {
        'adblueback': '#0c69ba'
      }
    },
    boxShadow: {
      description: '0 5px 10px 1px rgb(0 0 0 / 25%), 0 3px 10px 5px rgb(0 0 0 / 5%)'
    }
  },
  plugins: [],
}
