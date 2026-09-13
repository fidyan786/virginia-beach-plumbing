# Google Search Console — Virginia Beach Plumbing

Production URL: `https://website-self-nine-84.vercel.app/`

## Already ready on production

- `/sitemap.xml` — live, uses production host in every `<loc>`
- `/robots.txt` — live, includes `Sitemap: https://website-self-nine-84.vercel.app/sitemap.xml`
- Verification meta hook — site outputs `<meta name="google-site-verification" …>` when a real token is set via:
  - Vercel env `PUBLIC_GOOGLE_SITE_VERIFICATION`, or
  - `siteConfig.googleSiteVerification` in `src/config/site.ts`

## ONE manual step (owner Google account required)

Google must issue the verification token from your account. No one else can invent a valid token.

1. Open [Google Search Console](https://search.google.com/search-console) while signed into the owner Google account.
2. **Add property** → **URL prefix** → enter exactly: `https://website-self-nine-84.vercel.app/`
3. Choose **HTML tag** verification and copy only the `content="…"` value (the long token string).
4. Either:
   - **Reply in chat** with that token so it can be deployed, **or**
   - Add Vercel Production env `PUBLIC_GOOGLE_SITE_VERIFICATION=<token>` on project `website` and redeploy.
5. After the meta tag is live on the homepage, click **Verify** in Search Console.
6. **Sitemaps** → submit: `https://website-self-nine-84.vercel.app/sitemap.xml`

That is the only blocker. Sitemap and robots are already correct.
