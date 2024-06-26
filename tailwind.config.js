/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        negative:'#F85A58',
        positive:'#87D162',
        orange:'#E59838',
        color1:'#D38F4B',
        color2:'#5286BC',
        color3:'#86BA70',
        color4:'#602F2C',
        special:'#E6DB67'
      }
    },
  },
  plugins: [],
}