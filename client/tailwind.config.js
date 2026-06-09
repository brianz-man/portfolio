/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        base: {
          DEFAULT: "#0A0A0F",
          soft: "#111118",
          muted: "#1A1A26",
        },
        accent: {
          DEFAULT: "#00CC8E",
          dim: "#009e6e",
          glow: "#00CC8E33",
        },
        text: {
          primary: "#F0F0FF",
          secondary: "#9090A8",
          muted: "#50505F",
        },
        surface: {
          DEFAULT: "#13131C",
          hover: "#1C1C2A",
          border: "#2A2A3C",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #00CC8E33" },
          "50%": { boxShadow: "0 0 40px #00CC8E66" },
        },
        slideLeft: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "slide-left": "slideLeft 0.6s ease forwards",
      },
      maxWidth: {
        portfolio: "1200px",
      },
    },
  },
  plugins: [],
};
