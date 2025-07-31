import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fedex-purple': '#4B0082',
        'fedex-orange': '#FF6600',
        'fedex-light': '#6B46C1',
        'fedex-dark': '#3B0764'
      },
    },
  },
  plugins: [require("daisyui")],
} as any;

export default config;