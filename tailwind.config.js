/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "cyberpunk", "halloween", "forest", "lofi", "wireframe", "luxury", "dracula", "night"],
  },
}
