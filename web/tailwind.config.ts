import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#5b8de8"
        },
        calm: {
          50: "#f5f8ff",
          100: "#e6f0ff",
          200: "#c9ddff",
          300: "#a6c7ff",
          400: "#7ba4f7",
          500: "#5b8de8",
          600: "#476fcb",
          700: "#3859a5"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;

