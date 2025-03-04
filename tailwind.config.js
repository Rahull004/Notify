/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        rob: ["Roboto", "sans-serif"],
      },
      colors: {
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        popup: {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        popup: "popup 0.1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
