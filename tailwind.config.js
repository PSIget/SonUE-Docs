module.exports = {
  content: [
    "./components/**/*.{js,tsx}",
    "./nextra-theme-docs/**/*.{js,tsx}",
    "./pages/**/*.{md,mdx,tsx}",
    "./theme.config.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        "space-grotesk": ["Space Grotesk", "monospace"],
        mono: [
          "Menlo",
          "Monaco",
          "Lucida Console",
          "Liberation Mono",
          "DejaVu Sans Mono",
          "Bitstream Vera Sans Mono",
          "Courier New",
          "monospace",
        ],
      },
      lineHeight: {
        '20': '5rem',
      }
    },
  },
  darkMode: "class",
};
