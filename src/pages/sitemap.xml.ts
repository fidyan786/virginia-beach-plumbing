import type { APIRoute } from 'astro';
import { sitemapXml } from '../lib/sitemap';

export const prerender = true;

/**
 * Endpoint (not a public/ static file) so /sitemap.xml returns 200.
 * A static public/sitemap.xml plus trailingSlash: 'always' 500s on the
 * extension URL while /sitemap.xml/ still served — robots.txt points at
 * /sitemap.xml, so that 500 blocked Googlebot.
 */
export const GET: APIRoute = ({ site }) => {
  return new Response(sitemapXml(site), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
