import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || 'https://example.com').replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

# Thank-you is also noindex in HTML
Disallow: /thank-you/

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
