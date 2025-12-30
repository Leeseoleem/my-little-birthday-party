import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}", // 스토리북 설정/문서
    "./src/**/*.stories.{js,ts,jsx,tsx,mdx}", // 스토리 파일
  ],
  plugins: [],
} satisfies Config;
