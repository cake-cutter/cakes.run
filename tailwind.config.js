/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#3B6837",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
