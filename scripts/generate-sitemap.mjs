/**
 * Writes public/sitemap.xml using the same origin resolution as Astro.
 * Static file avoids trailingSlash rewrite issues with /sitemap.xml/.
 * Keep path lists in sync with src/config/site.ts and src/data/resources.ts.
 */
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function normalizeOrigin(raw) {
  if (!raw) return undefined;
  const trimmed = String(raw).trim();
  if (!trimmed) return undefined;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return undefined;
  }
}

function resolveSiteOriginFromEnv(env = process.env) {
  const explicit = normalizeOrigin(env.PUBLIC_SITE_URL || env.SITE_URL);
  if (explicit) return explicit;
  const vercelProd = normalizeOrigin(env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProd) return vercelProd;
  if (env.VERCEL_ENV === 'production') {
    const preview = normalizeOrigin(env.VERCEL_URL);
    if (preview) return preview;
  }
  const netlify = normalizeOrigin(env.URL || env.DEPLOY_PRIME_URL);
  if (netlify) return netlify;
  return 'https://website-self-nine-84.vercel.app';
}

const core = [
  '/',
  '/plumbing-services/',
  '/emergency-plumber/',
  '/residential-plumbing/',
  '/commercial-plumbing/',
  '/service-areas/',
  '/about/',
  '/contact/',
  '/resources/',
  '/privacy/',
  '/terms/',
];

const services = [
  '/emergency-plumber/',
  '/drain-cleaning/',
  '/sewer-line-repair/',
  '/trenchless-sewer-repair/',
  '/water-heaters/',
  '/leak-detection/',
  '/slab-leak-repair/',
  '/commercial-plumbing/',
  '/repiping/',
  '/gas-line-services/',
  '/backflow-testing/',
  '/sump-pump/',
  '/plumbing-repairs/',
  '/residential-plumbing/',
];

/** Discover guide slugs from resources.ts so new guides are not missed. */
function resourceSlugs() {
  const file = readFileSync(join(root, 'src/data/resources.ts'), 'utf8');
  const slugs = [...file.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  return slugs.map((slug) => `/resources/${slug}/`);
}

/** Also include service page folders under src/pages as a safety net. */
function serviceFolders() {
  const pages = join(root, 'src/pages');
  const skip = new Set(['about', 'contact', 'privacy', 'terms', 'thank-you', 'resources', 'service-areas', 'plumbing-services']);
  return readdirSync(pages, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !skip.has(d.name))
    .map((d) => `/${d.name}/`);
}

const paths = [...new Set([...core, ...services, ...serviceFolders(), ...resourceSlugs()])].sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

const origin = resolveSiteOriginFromEnv(process.env);
const today = new Date().toISOString().slice(0, 10);
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const out = join(root, 'public', 'sitemap.xml');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, body, 'utf8');
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml (${origin})`);
