/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f4efe6",
          50: "#faf6ef",
          100: "#f3eee4",
          200: "#e8dfd0",
          300: "#d8cbb4",
        },
        gold: {
          DEFAULT: "#c4a06a",
          50: "#f7f0e4",
          100: "#efe2c8",
          400: "#d4b483",
          500: "#c4a06a",
          600: "#a7844e",
        },
        green: {
          50: "#f3f6f1",
          100: "#e4eee3",
          200: "#c8d8c4",
          300: "#9fb89b",
          400: "#6d9269",
          500: "#4a7548",
          600: "#2f5a3a",
          700: "#24462e",
          800: "#1c3524",
          900: "#12241a",
        },
        gray: {
          50: "#faf7f2",
          100: "#f1ebe3",
          200: "#e4d9cc",
          300: "#cfc0ae",
          400: "#a89682",
          500: "#8a7b6a",
          600: "#6a5f52",
          700: "#4a433a",
          800: "#2c2722",
          900: "#1a1713",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(28, 25, 20, 0.06)",
        lift: "0 22px 50px rgba(28, 25, 20, 0.12)",
        glow: "0 10px 28px rgba(47, 90, 58, 0.22)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
