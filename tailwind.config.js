/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFAEB',
          100: '#FFF1C6',
          200: '#FFE58F',
          300: '#FFD54F',
          400: '#FFC107', // Main gold color
          500: '#FFA000',
          600: '#FF8F00',
          700: '#FF6F00',
          800: '#E65100',
          900: '#BF360C',
        },
        black: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121', // Main black color
        },
        white: '#FFFFFF',
        // Logo colors
        gem: {
          pink: '#D1497E',
          purple: '#A674E3',
          violet: '#7676F0',
          blue: '#4F9EF4',
          cyan: '#3BC8F5',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 5px #D1497E, 0 0 10px #D1497E, 0 0 15px #D1497E',
        'neon-purple': '0 0 5px #A674E3, 0 0 10px #A674E3, 0 0 15px #A674E3',
        'neon-violet': '0 0 5px #7676F0, 0 0 10px #7676F0, 0 0 15px #7676F0',
        'neon-blue': '0 0 5px #4F9EF4, 0 0 10px #4F9EF4, 0 0 15px #4F9EF4',
        'neon-cyan': '0 0 5px #3BC8F5, 0 0 10px #3BC8F5, 0 0 15px #3BC8F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
