/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#252422",
        secondary: "#403d39",
        primary: "#ccc5b9",
        text: "#fffcf2",
        contrast: "#eb5e28",
      },
    },
  },
  plugins: [],
};
