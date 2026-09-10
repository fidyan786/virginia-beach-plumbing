import type { APIRoute } from 'astro';
import { resolveSiteOrigin } from '../lib/site-url';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = resolveSiteOrigin(site);
  const body = `User-agent: *
Allow: /

# Utility / owner pages (also noindex in HTML)
Disallow: /thank-you/
Disallow: /local-presence/

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
