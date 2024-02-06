/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      abel: ["Abel", "sans-serif"],
      hind: ["Hind", "sans-serif"],
      spaceGrotesk: ["Space Grotesk", "sans-serif"],
      dancingScript: ["Dancing Script", "cursive"],
    },
    extend: {
      colors: {
        primary: {
          light: "#FFFFFF", // Light mode primary color (white)
          "light-900": "#F5F5F5", // Shade of white
          "light-800": "#EEEEEE",
          "light-700": "#E0E0E0",
          "light-600": "#D3D3D3",
          "light-500": "#C0C0C0",
          "light-400": "#B0B0B0",
          "light-300": "#A9A9A9",
          "light-200": "#808080",
          "light-100": "#696969",
          default: "#FFFFFF",
          dark: "#000000", // Dark mode primary color (black)
          "dark-900": "#212121", // Deepest shade of black
          "dark-800": "#424242",
          "dark-700": "#616161",
          "dark-600": "#757575",
          "dark-500": "#9E9E9E",
          "dark-400": "#BDBDBD",
          "dark-300": "#E0E0E0",
          "dark-200": "#EEEEEE",
          "dark-100": "#F5F5F5", // Lightest shade of black
        },
        secondary: {
          light: "#ff0000", // Light mode primary color
          "light-900": "#B71C1C", // Deepest shade of red
          "light-800": "#D32F2F",
          "light-700": "#E57373",
          "light-600": "#FFCDD2", // Middle shade (white)
          "light-500": "#F48FB1",
          "light-400": "#FFB74D",
          "light-300": "#FFD54F",
          "light-200": "#FFF176",
          "light-100": "#FFFFFF", // Lightest shade of red
          default: "#ff0000", // Default primary color
          dark: "#ffffff", // Dark mode primary color
          "dark-900": "#F5F5F5", // Shade of white
          "dark-800": "#EEEEEE",
          "dark-700": "#E0E0E0",
          "dark-600": "#D3D3D3",
          "dark-500": "#C0C0C0",
          "dark-400": "#B0B0B0",
          "dark-300": "#A9A9A9",
          "dark-200": "#808080",
          "dark-100": "#696969",
        },
      },
    },
  },
  darkMode: "class",
};
