/**
 * Post-build SEO QA against dist/. Fail the build on hard errors.
 * Run: node scripts/seo-qa.mjs
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const dist = join(root, 'dist');

if (!existsSync(dist)) {
  console.error('seo-qa: dist/ missing. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full);
    else if (name === 'index.html' || name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(dist);

const errors = [];
const warnings = [];
const titles = new Map();
const utilityNoindex = ['thank-you', 'local-presence', '404'];

for (const file of htmlFiles) {
  const rel = file.slice(dist.length).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  const is404 = rel.includes('/404');
  const isUtility = utilityNoindex.some((u) => rel.includes(`/${u}`));

  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  const canonical = (html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i) || [])[1] || '';
  const robots = (html.match(/name=["']robots["'][^>]*content=["']([^"']+)["']/i) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  if (!is404 && !title.trim()) errors.push(`${rel}: missing <title>`);
  if (!is404 && !isUtility && !canonical) errors.push(`${rel}: missing canonical`);
  if (!is404 && h1s.length === 0) errors.push(`${rel}: missing H1`);
  if (h1s.length > 1) warnings.push(`${rel}: multiple H1 (${h1s.length})`);

  if (isUtility && !/noindex/i.test(robots) && !is404) {
    errors.push(`${rel}: utility page missing noindex`);
  }

  if (title) {
    const key = title.trim().toLowerCase();
    if (!titles.has(key)) titles.set(key, []);
    titles.get(key).push(rel);
  }

  if (/AggregateRating|reviewRating|"@type"\s*:\s*"Review"/i.test(html)) {
    errors.push(`${rel}: fabricated review schema suspected`);
  }
  if (/streetAddress/i.test(html) && /application\/ld\+json/i.test(html)) {
    // Allow only if intentionally present; currently should not exist
    warnings.push(`${rel}: streetAddress appears in HTML/schema — confirm it is verified`);
  }
}

for (const [title, files] of titles) {
  const indexable = files.filter((f) => !utilityNoindex.some((u) => f.includes(`/${u}`)) && !f.includes('/404'));
  if (indexable.length > 1) {
    errors.push(`duplicate title "${title}" on: ${indexable.join(', ')}`);
  }
}

const sitemapPath = join(dist, 'sitemap.xml');
const publicSitemap = join(root, 'public', 'sitemap.xml');
const smFile = existsSync(sitemapPath) ? sitemapPath : publicSitemap;
if (existsSync(smFile)) {
  const sm = readFileSync(smFile, 'utf8');
  if (/\/thank-you\//.test(sm)) errors.push('sitemap includes /thank-you/');
  if (/\/local-presence\//.test(sm)) errors.push('sitemap includes /local-presence/');
  if (!/\/tankless-water-heaters\//.test(sm)) warnings.push('sitemap missing tankless URL');
  if (!/\/resources\/foul-drain-odor\//.test(sm)) warnings.push('sitemap missing foul-drain-odor');
} else {
  errors.push('sitemap.xml not found in dist/ or public/');
}

const robotsPath = join(dist, 'robots.txt');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!/Disallow:\s*\/thank-you\//.test(robots)) errors.push('robots.txt missing thank-you Disallow');
  if (!/Disallow:\s*\/local-presence\//.test(robots)) errors.push('robots.txt missing local-presence Disallow');
  if (!/Sitemap:\s*https?:\/\//.test(robots)) errors.push('robots.txt missing Sitemap declaration');
} else {
  errors.push('robots.txt missing from dist/');
}

console.log(`seo-qa: scanned ${htmlFiles.length} HTML files`);
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

if (errors.length) {
  console.error(`seo-qa: ${errors.length} error(s)`);
  process.exit(1);
}
console.log('seo-qa: OK');
