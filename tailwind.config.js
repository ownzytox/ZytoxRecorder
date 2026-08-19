/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#171717",
        border: "#2F2F2F",
        primary: "#9E7FFF",
        secondary: "#38bdf8",
        accent: "#f472b6",
      }
    },
  },
  plugins: [],
}
