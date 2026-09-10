/**
 * Single source of truth for absolute site origin.
 * Set PUBLIC_SITE_URL (or SITE_URL) on Vercel when a custom domain goes live.
 * Until then, the verified production host is the fallback.
 */
export const DEFAULT_SITE_ORIGIN = 'https://website-self-nine-84.vercel.app';

export function normalizeOrigin(raw: string | undefined | null): string | undefined {
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

/** Resolve origin for Astro config / Node build scripts (env-aware). */
export function resolveSiteOriginFromEnv(
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): string {
  const explicit = normalizeOrigin(env.PUBLIC_SITE_URL || env.SITE_URL);
  if (explicit) return explicit;

  const vercelProd = normalizeOrigin(env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProd) return vercelProd;

  // Prefer production host over preview deployment URLs when available.
  if (env.VERCEL_ENV === 'production') {
    const preview = normalizeOrigin(env.VERCEL_URL);
    if (preview) return preview;
  }

  const netlify = normalizeOrigin(env.URL || env.DEPLOY_PRIME_URL);
  if (netlify) return netlify;

  return DEFAULT_SITE_ORIGIN;
}

/** Resolve origin inside Astro pages/components from Astro.site. */
export function resolveSiteOrigin(site: URL | undefined): string {
  return normalizeOrigin(site?.origin) || DEFAULT_SITE_ORIGIN;
}
