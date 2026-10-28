/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://colorcode.revoxera.com',
  generateRobotsTxt: false, // We manage robots.txt manually
  outDir: 'public',
  exclude: ['/privacy', '/terms', '/icon.png', '/_not-found'],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/tools/')) {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/') || path.startsWith('/guides/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
