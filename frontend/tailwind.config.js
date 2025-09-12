/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#ff9933",
        govBlue: "#174ea6", 
        green: "#138808",
        govGreen: "#138808",
        govRed: "#d62828",
      },
      fontFamily: {
        hindi: ["Noto Sans Devanagari", "Noto Sans", "sans-serif"], 
        body: ["Noto Sans", "Segoe UI", "sans-serif"], 
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.08)",
      }
    },
  },
  safelist: [
    "bg-govBlue",
    "text-govBlue", 
    "bg-saffron",
    "text-saffron",
    "bg-green",
    "text-green",
    "bg-govGreen",
    "bg-govRed",
    "from-saffron",
    "to-green",
    "font-hindi",
    "hindi-text",
    "sidebar-transition",
    "sidebar-container",
    "sidebar-toggle",
    "emergency-pulse",
    "footer-grid"
  ],
  plugins: [],
}
