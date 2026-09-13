/**
 * @deprecated Do not write public/sitemap.xml.
 * A static sitemap.xml plus trailingSlash: 'always' made GET /sitemap.xml
 * return 500 while /sitemap.xml/ worked. Google reads the no-slash URL from robots.txt.
 * Canonical generation lives in src/pages/sitemap.xml.ts and src/lib/sitemap.ts.
 */
console.log('Sitemap is generated at build time by src/pages/sitemap.xml.ts — nothing to write.');
