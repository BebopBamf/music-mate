module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "spotify-gray": "#191414",
        "spotify-green-light": "#1ED760",
        "spotify-green-dark": "#1DB954",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
