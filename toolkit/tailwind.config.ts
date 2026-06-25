import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-secondary": "var(--accent-secondary)",
        "accent-brand": "var(--accent-brand)",
        "brand-black": "rgb(var(--brand-black) / <alpha-value>)",
        "brand-navy": "rgb(var(--brand-navy) / <alpha-value>)",
        "brand-navy-light": "rgb(var(--brand-navy-light) / <alpha-value>)",
        "brand-navy-muted": "rgb(var(--brand-navy-muted) / <alpha-value>)",
        "brand-blue": "rgb(var(--brand-blue) / <alpha-value>)",
        "brand-blue-light": "rgb(var(--brand-blue-light) / <alpha-value>)",
        "brand-red": "rgb(var(--brand-red) / <alpha-value>)",
        "brand-red-hover": "rgb(var(--brand-red-hover) / <alpha-value>)",
        "brand-orange": "rgb(var(--brand-orange) / <alpha-value>)",
        "brand-orange-dark": "rgb(var(--brand-orange-dark) / <alpha-value>)",
        "brand-yellow": "rgb(var(--brand-yellow) / <alpha-value>)",
        "brand-white": "rgb(var(--brand-white) / <alpha-value>)",
        "brand-silver": "rgb(var(--brand-silver) / <alpha-value>)",
        "brand-silver-muted": "rgb(var(--brand-silver-muted) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
