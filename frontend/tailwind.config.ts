import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f59e0b",
          light: "#e0f8e9",
        },
        "background-light": "#f6f8f7",
        "background-dark": "#1f2937",
        "card-dark": "#374151",
        "surface-dark": "#262626",
        "text-main": "#f9fafb",
        "text-secondary": "#d1d5db",
        "text-dark-secondary": "#a3a3a3",
        "border-color": "#4b5563",
        neutral: {
          50: "#f8f9fa",
          100: "#e9ecef",
          200: "#dee2e6",
          300: "#ced4da",
          400: "#adb5bd",
          500: "#6c757d",
          600: "#495057",
          700: "#343a40",
          800: "#212529",
          900: "#121212",
        },
      },
      fontFamily: {
        display: ["var(--font-epilogue)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;