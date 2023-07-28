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
      // Discord Link
      {
        source: "/discord",
        destination: "https://discord.gg/red-projects-530968529311367178",
        statusCode: 301,
      },
      // ModDB Link
      {
        source: "/moddb",
        destination: "https://www.moddb.com/mods/stalker2ue",
        statusCode: 301,
      },
      // GitHub Link
      {
        source: "/github",
        destination: "https://github.com/RedPandaProjects/Stalker2UE",
        statusCode: 301,
      },
      // Boosty Link
      {
        source: "/boosty",
        destination: "https://boosty.to/stalker2ue",
        statusCode: 301,
      },
      // Tech Redirects
      {
        source: "/index",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/en/index",
        destination: "/en",
        statusCode: 301,
      },
      {
        source: "/uk/index",
        destination: "/uk",
        statusCode: 301,
      },
      {
        source: "/docs",
        destination: "/docs/getting-started",
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.imgur.com', 'cdn.cloudflare.steamstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**'
      },
    ],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://s2ue.org',
  },
});
