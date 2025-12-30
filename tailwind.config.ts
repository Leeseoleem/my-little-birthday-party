import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          0: "var(--gray-0)",
          10: "var(--gray-10)",
          20: "var(--gray-20)",
          30: "var(--gray-30)",
          40: "var(--gray-40)",
          50: "var(--gray-50)",
          60: "var(--gray-60)",
          70: "var(--gray-70)",
          80: "var(--gray-80)",
        },
        main: {
          DEFAULT: "var(--main)",
          soft: "var(--main-soft)",
          accent: "var(--main-accent)",
          muted: "var(--main-muted)",
        },
        flame: {
          0: "var(--flame-0)",
          30: "var(--flame-30)",
          60: "var(--flame-60)",
          100: "var(--flame-100)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
