// tailwind.config.js
module.exports = {
  darkMode: "class", // ✅ Enable dark mode via class strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        karma: ["Karma", "serif"],
        julius: ["Julius Sans One", "sans-serif"],
      },
      keyframes: {
        // move the belt by ONE copy (= 50 % of its width)
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-x": "scroll-x 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
