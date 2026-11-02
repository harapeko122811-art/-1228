import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a1424",
          900: "#0f1d33",
          800: "#162a47",
          700: "#203a5f",
          600: "#2e4d78",
        },
        accent: { DEFAULT: "#3b6ea8", light: "#6f9bd0", soft: "#e8eff8" },
        ink: { DEFAULT: "#1f2733", muted: "#5b6573", faint: "#8a93a0" },
        paper: { DEFAULT: "#ffffff", alt: "#f5f6f8", line: "#dde1e7" },
      },
      fontFamily: {
        sans: [
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          '"Noto Sans JP"',
          '"BIZ UDPGothic"',
          "Meiryo",
          "system-ui",
          "sans-serif",
        ],
        serif: ['"Hiragino Mincho ProN"', '"Noto Serif JP"', '"Yu Mincho"', "serif"],
      },
      maxWidth: { prose: "44rem" },
    },
  },
  plugins: [],
};
export default config;
