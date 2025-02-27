/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#333333",
        accent: "#666666",
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 