/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        indigo: {
          400: "#7c3aed",
          600: "#4f46e5",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
