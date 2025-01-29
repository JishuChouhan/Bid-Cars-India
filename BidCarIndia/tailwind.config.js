/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '340px',
      },
      borderRadius: {
        '125': '125px',
      },
      keyframes: {
        drive: {
          '0%': { left: '0%' }, // Start position
          '100%': { left: '100%' }, // End position
        },
      },
      animation: {
        drive: 'drive 5s linear infinite',
      },
    },
  },
  plugins: [],
}