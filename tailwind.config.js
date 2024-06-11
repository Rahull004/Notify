/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rob': ['Roboto', 'sans-serif'], 
      },
      colors: {
        gray900: {
          DEFAULT: "#212121",
          87: "rgba(33, 33, 33, 0.87)",
          60: "rgba(33, 33, 33, 0.60)",
          36: "rgba(33, 33, 33, 0.36)",
        },
        gray200: "#EEEEEE",
        black: {
          DEFAULT: "#000000",
          32: "rgba(0, 0, 0, 0.32)",
          24: "rgba(0, 0, 0, 0.24)",
          12: "rgba(0, 0, 0, 0.12)",
        },
        white: {
          DEFAULT: "#FFFFFF",
          24: "rgba(255, 255, 255, 0.24)",
        },
        blue400: "#42A5F5",
        blue500: "#2196F3",
        blue600: "#1E88E5",
        orange900: "#E65100",
        orange200: "#FFCC80",
        green900: "#1B5E20",
        green200: "#A5D6A7",
        deepPurple900: "#4527A0",
        deepPurple200: "#2196F3",
        red400: "#EF5350",
        red500: "#F44336",
      }
    }
  },
  plugins: [],
}