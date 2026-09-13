import { allServices } from '../config/site';
import { resources } from '../data/resources';
import { resolveSiteOrigin } from './site-url';

const CORE_PATHS = [
  '/',
  '/plumbing-services/',
  '/service-areas/',
  '/about/',
  '/contact/',
  '/resources/',
  '/privacy/',
  '/terms/',
] as const;

/** Indexable canonical paths only — no thank-you, local-presence, or 404. */
export function indexablePaths(): string[] {
  const services = allServices.map((s) => s.href);
  const guides = resources.map((r) => `/resources/${r.slug}/`);
  const paths = [...new Set([...CORE_PATHS, ...services, ...guides])];
  return paths.sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });
}

export function sitemapXml(site: URL | undefined, lastmod = new Date().toISOString().slice(0, 10)): string {
  const origin = resolveSiteOrigin(site);
  const urls = indexablePaths()
    .map(
      (path) => `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
