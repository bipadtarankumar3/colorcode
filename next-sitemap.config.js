/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://colorcode.revoxera.com',
  generateRobotsTxt: false, // We manage robots.txt manually
  outDir: 'public',
  exclude: ['/privacy', '/terms'],
};
