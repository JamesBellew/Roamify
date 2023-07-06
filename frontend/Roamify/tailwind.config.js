/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#F2F2F3',
      'purple-main': '#8C54FB',
      'pink-main': '#CE4F51',
      'dark-grey': '#17171C',

      'grey-text': '#4D4A4F',
      'text-secondary': '#5B575E',
      'facebook': '#4267B2',
      'background-main': '#100F15',
    },
  },
  plugins: [],
}