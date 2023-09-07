// Define the base URL for the site
const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://s2ue.org"
).replace(/\/$/, "");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/*.en", "/*.uk"],
  // Define alternate references for different locales
  alternateRefs: [
    {
      href: `${siteUrl}/en/`,
      hreflang: "en",
    },
    {
      href: `${siteUrl}/uk/`,
      hreflang: "uk",
    },
  ],
  // Transform the paths for the sitemap
  transform: async (config, path) => {
    // Remove the locale part of the path (e.g. /es/about -> /about)
    const extractLocaleIndependentPath = (path) => {
      const matches = config.alternateRefs.map((alt) =>
        `${path}`.replace(/\.(en|ru|uk)$/, "")
      );
      return matches.sort((a, b) => a.length - b.length)[0];
    };

    const localeIndependentPath = extractLocaleIndependentPath(path);

    // Map the locale independent path onto the locale paths
    const alternateRefs = config.alternateRefs.map((alt) => {
      return { ...alt, href: `${alt.href}`, hrefIsAbsolute: false };
    });

    return {
      loc: localeIndependentPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};
