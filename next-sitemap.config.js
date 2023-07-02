/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://s2ue.org',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/*.en', '/*.uk'],
  alternateRefs: [
    {
      href: 'https://s2ue.org/en',
      hreflang: 'en',
    },
    {
      href: 'https://s2ue.org/uk',
      hreflang: 'uk',
    },
  ],
  transform: async (config, path) => {
    // Remove the locale part of the path (e.g. /es/about -> /about)
    const extractLocaleIndependentPath = (path) => {
      const matches = config.alternateRefs.map((alt) =>
        `${path}`.replace(/\.(en|ru|uk)$/, '')
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
}
