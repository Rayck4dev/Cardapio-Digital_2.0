/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neonBrown: "#964B00",
        neonPink: "#FF00A8",
        neonGreen: "#00FF9F",
        neonOrange: "#FFA500",
        neonPurple: "#A020F0",
        neonBlue: "#00CFFF",
        neonCyan: "#40E0D0",
        neonYellow: "#FFFF33",
        neonRed: "#FF3131",
        neonMagenta: "#FF00FF",
        neonTeal: "#00FFD1",
        neonLime: "#BFFF00",
        neonGold: "#FFD700",
      },
      fontFamily: {
        caveat: ["Caveat Brush", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        edu: ["Edu NSW ACT Cursive", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
        emilys: ["Emilys Candy", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        audiowide: ["Audiowide", "sans-serif"],
      },
    },
  },
  plugins: [],
};
