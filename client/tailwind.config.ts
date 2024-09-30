import { type Config } from "tailwindcss";

export default {
  content: ["**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        forestGreen: "#779150"
      },
    },
  },
  plugins: [],
} satisfies Config;
