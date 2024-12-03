/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    screens: {
      'md': '910px',
      'lg': '1440px'
    },
    extend: {},
  },
  plugins: [],
};
