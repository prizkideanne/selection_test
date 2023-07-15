/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'red-600': '#DD636E',
        'red-700': '#C05762',
      },
      fontFamily: {
        sans: ['Poppins', 'Open Sans']
      }
    },
  },
  plugins: [],
};
