import { type Config } from "tailwindcss";

export default {
  content: [
    "./**/*.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forestGreen: "#779150",
      },
    },
  },
  plugins: [],
} satisfies Config;
