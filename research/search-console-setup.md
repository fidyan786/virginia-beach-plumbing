# Google Search Console & indexing — Virginia Beach Plumbing

## Current production readiness (code)

- Production: `https://website-self-nine-84.vercel.app/`
- Sitemap: `/sitemap.xml` (indexable URLs only; excludes thank-you + local-presence)
- Robots: allows crawl; Disallow `/thank-you/` and `/local-presence/`; Sitemap declaration present
- Canonicals: absolute, trailing-slash consistent
- Build gate: `npm run build` → `postbuild` SEO QA

Prefer connecting Search Console to the **final custom domain** once it exists. Temporary Vercel hostname can be verified for interim testing, but migrate properties when the domain goes live.

## OWNER ACTION — Search Console (Google)

1. Open https://search.google.com/search-console
2. Add a **Domain** property for the final domain (recommended), or a URL-prefix property for the current production URL if testing early.
3. Verify via DNS TXT (Domain) or the method Google offers.
4. Submit sitemap: `https://YOUR-DOMAIN/sitemap.xml` (or current production sitemap URL).
5. Use **URL Inspection** on homepage + core money pages (`/emergency-plumber/`, `/drain-cleaning/`, `/water-heaters/`, `/tankless-water-heaters/`, etc.).
6. Request indexing only for important new/updated URLs; do not spam requests.
7. Monitor: Pages (indexed / excluded), Experience, Performance (queries, CTR, positions).

## OWNER ACTION — Bing Webmaster Tools (free)

1. https://www.bing.com/webmasters
2. Import from Google Search Console or verify the domain.
3. Submit the same sitemap.

## What to watch after data exists

- High impressions + low CTR → improve title/description
- Positions 4–10 and 11–20 on commercial queries → deepen content / internal links
- Crawled not indexed / duplicate canonicals → fix in code (this repo’s QA helps prevent regressions)
- Soft 404 / thin exclusions → improve or consolidate pages

## Do not fabricate

- Do not claim the property is verified until Google shows verified.
- Do not claim pages are indexed without Search Console proof.
- Do not create extra URLs just to inflate indexed page count.

## Priority URLs to inspect first

`/` · `/plumbing-services/` · `/emergency-plumber/` · `/drain-cleaning/` · `/sewer-line-repair/` · `/water-heaters/` · `/tankless-water-heaters/` · `/leak-detection/` · `/commercial-plumbing/` · `/residential-plumbing/` · key guides under `/resources/`
