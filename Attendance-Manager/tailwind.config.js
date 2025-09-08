/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // This sets 'Outfit' as the default font for the 'font-sans' utility
        sans: ['Outfit_400Regular', 'sans-serif'],
        // You can add other weights or styles as needed
        'sans-bold': ['Outfit_700Bold'],
      },
    },
  },
  plugins: [],
};