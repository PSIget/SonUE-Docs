const withNextra = require("nextra")("nextra-theme-docs", "./theme.config.tsx");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const env = {
  NEXT_PUBLIC_SITE_NAME: 'STALKER on UE',
  NEXT_PUBLIC_BASE_URL: 'https://s2ue.org',
  NEXT_PUBLIC_DISCORD_URL: 'https://discord.gg/red-projects-530968529311367178',
  NEXT_PUBLIC_BOOSTY_URL: 'https://boosty.to/stalker2ue',
  NEXT_PUBLIC_MODDB_URL: 'https://www.moddb.com/mods/stalker2ue',
  NEXT_PUBLIC_SOURCE_CODE_URL: 'https://git.s2ue.org/RedProjects/SonUE',
  NEXT_PUBLIC_DOCS_SOURCE_CODE_URL: 'https://git.s2ue.org/PSIget/SonUE-Docs',
};

const i18n = {
  locales: ["ru", "en", "uk"],
  defaultLocale: "ru",
};

const images = {
  minimumCacheTTL: 86400,
  formats: ['image/avif', 'image/webp'],
  domains: ['i.imgur.com', 'cdn.cloudflare.steamstatic.com'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.s2ue.org',
      port: '',
      pathname: '/**'
    },
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
};

const redirects = async () => {
  return [
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
    // Main Redirects
    {
      source: "/docs",
      destination: "/docs/getting-started",
      statusCode: 301,
    },
  ];
};

const nextraConfig = withNextra({
  env,
  i18n,
  images,
  redirects,
  reactStrictMode: true,
});

module.exports = withBundleAnalyzer(nextraConfig);
