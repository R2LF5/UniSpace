/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
        height: {
          '3/7': '45%',
          '2/5': '40%',
        },
      colors: {
        Space: '#263138',
        purp: '#4B47C0',
        purplight :'#5856D3'
      },
    },
  },
  plugins: [],
};
