/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue100:"#C7DDF6",
        blue200:"#4080CB",
        blue300:"#002857",
        blue400:"#002550",
        blue500:"#00152D"
      }
    },
  },
  plugins: [],
}

