/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#036c48",
          dim:     "#005f3e",
          fixed:   "#9df5c6",
          container: "#9df5c6",
        },
        onPrimary: {
          DEFAULT:   "#e1ffeb",
          container: "#005e3e",
        },
        secondary: {
          container: "#e1e3df",
        },
        onSecondary: {
          container: "#4f524f",
        },
        tertiary: {
          DEFAULT:   "#5a6341",
          container: "#eef8cd",
        },
        onTertiary: {
          DEFAULT: "#f4fed2",
        },
        surface: {
          DEFAULT:   "#f9f9f8",
          low:       "#f2f4f2",
          container: "#ebefec",
          high:      "#e4e9e7",
          lowest:    "#ffffff",
        },
        onSurface: {
          DEFAULT: "#2d3432",
          variant: "#5a615e",
        },
        outline: {
          DEFAULT: "#757c7a",
          variant: "#acb3b1",
        },
        error: {
          DEFAULT:   "#9f403d",
          container: "#fe8983",
        },
        onError: "#fff7f6",
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "sans-serif"],
        body:     ["var(--font-manrope)", "sans-serif"],
        label:    ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg:      "0.25rem",
        xl:      "0.5rem",
        full:    "0.75rem",
      },
    },
  },
  plugins: [],
};
