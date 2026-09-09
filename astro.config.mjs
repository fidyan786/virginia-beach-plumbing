// @ts-check
import { defineConfig } from 'astro/config';

function productionSite() {
  const explicit = process.env.PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit && /^https?:\/\//i.test(explicit)) {
    return explicit.replace(/\/$/, '');
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) {
    return `https://${vercelProd.replace(/^https?:\/\//, '')}`;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/^https?:\/\//, '')}`;
  }

  const netlify = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (netlify && /^https?:\/\//i.test(netlify)) {
    return netlify.replace(/\/$/, '');
  }

  // Local production builds keep a valid absolute origin until a host URL exists.
  return 'https://example.com';
}

// https://astro.build/config
export default defineConfig({
  site: productionSite(),
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
