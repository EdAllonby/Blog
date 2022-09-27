/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-yellow": "#fffff3",
        "dark-gray": "#3a3a3a",
      },
      fontFamily: {
        ebgaramond: "EB Garamond Variable",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
