/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#995600',
          light: '#ffa500'
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  }
}
