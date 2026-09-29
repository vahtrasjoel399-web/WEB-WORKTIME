import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "sans-serif"] },
      colors: {
        ink: "#11130f",
        paper: "#f3f1ea",
        lime: "#d6ff43",
        moss: "#293127",
      },
    },
  },
  plugins: [],
} satisfies Config;
