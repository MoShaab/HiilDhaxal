import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      lightgrey: "#444245",
      grey: 'rgba(0, 0, 0, 0.55)',
      lightpink: '#F8F7F7',
      pink: '#DF6751',
      bgpink: 'rgba(223, 103, 81, 0.15)',
      darkpink: '#FEEDEA',
      lightblack : '#333333',
      textbl: "#363636",
      footerlinks: 'rgba(54, 54, 54, 0.9)',
      bordertop: 'rgba(105, 120, 131, 0.16)',
      darkgrey: 'rgba(44, 9, 11, 0.8)'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          fontFamily: {
            sans: ['Poppins', 'sans-serif'], // Replace default sans-serif with Poppins
          },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;