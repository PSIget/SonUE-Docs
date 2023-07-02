const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  staticImage: true,
  flexsearch: {
    codeblocks: true,
  },
  defaultShowCopyCode: true,
  latex: true,
});

module.exports = withNextra({
  i18n: {
    locales: ["ru", "en", "uk"],
    defaultLocale: "ru",
  },
  redirects: () => {
    return [
      {
        source: "/docs",
        destination: "/docs/getting-started",
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['youtube.com'],
  },
  reactStrictMode: true,
});
