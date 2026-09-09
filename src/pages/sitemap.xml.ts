import type { APIRoute } from 'astro';
import { p0Services, p1Services } from '../config/site';
import { resources } from '../data/resources';

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || 'https://example.com').replace(/\/$/, '');

  const staticPaths = [
    '/',
    '/emergency-plumber/',
    '/plumbing-services/',
    '/contact/',
    '/about/',
    '/service-areas/',
    '/residential-plumbing/',
    '/resources/',
    '/privacy/',
    '/terms/',
    ...p0Services.map((s) => s.href),
    ...p1Services.map((s) => s.href),
    ...resources.map((r) => `/resources/${r.slug}/`),
  ];

  const urls = [...new Set(staticPaths)];
  const p0Hrefs = new Set(p0Services.map((s) => s.href));

  function urlMeta(path: string) {
    if (path === '/') return { changefreq: 'weekly', priority: '1.0' };
    if (path === '/emergency-plumber/') return { changefreq: 'weekly', priority: '0.9' };
    if (p0Hrefs.has(path) || path === '/contact/') return { changefreq: 'monthly', priority: '0.85' };
    if (path === '/plumbing-services/' || path === '/residential-plumbing/' || path === '/service-areas/') {
      return { changefreq: 'monthly', priority: '0.75' };
    }
    if (path.startsWith('/resources/') && path !== '/resources/') return { changefreq: 'monthly', priority: '0.55' };
    if (path === '/privacy/' || path === '/terms/') return { changefreq: 'yearly', priority: '0.2' };
    return { changefreq: 'monthly', priority: '0.6' };
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => {
    const { changefreq, priority } = urlMeta(path);
    return `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
