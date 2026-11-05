import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        accent: "#5cded6",
        hairline: "rgba(255, 255, 255, 0.14)",
      },
      fontFamily: {
        sans: ["var(--font-graphik)"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::after": { content: "none" },
            "blockquote p:first-of-type::before": { content: "none" },
          },
        },
      },
    },
  },
} satisfies Config;
