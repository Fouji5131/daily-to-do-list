/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "light-blue": "#F5F9FF",
        "light-blue": "#131414",
      },
      fontFamily: {
        bouncy: ["Bouncy", "cursive"],
      },
    },
  },
  plugins: [],
};