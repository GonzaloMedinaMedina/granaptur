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
      keyframes: {
        navLink:
        {
          '0%': 'transform: scale(1)',
          '50%': 'transform: scale(1.25)',
          '100%': 'transform: scale(1.5)'         
        }
      },
      fontSize: {
        clamp: 'clamp(20px, 1rem + 2vw, 30px)'
      }
    },
    boxShadow: {
      description: '0 5px 10px 1px rgb(0 0 0 / 25%), 0 3px 10px 5px rgb(0 0 0 / 5%)'
    }
  },
  plugins: [],
}
