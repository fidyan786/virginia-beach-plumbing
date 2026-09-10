// @ts-check
import { defineConfig } from 'astro/config';
import { resolveSiteOriginFromEnv } from './src/lib/site-url.ts';

// https://astro.build/config
export default defineConfig({
  site: resolveSiteOriginFromEnv(process.env),
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
