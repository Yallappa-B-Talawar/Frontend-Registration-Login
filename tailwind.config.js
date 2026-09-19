/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        geist: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#171717',
          900: '#0a0a0a',
          black: '#000000',
        },
        nextblue: {
          DEFAULT: '#0070f3',
          hover: '#0060df',
          light: '#e6f2ff'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'nextcard': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'nextelevated': '0 12px 32px 0 rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
