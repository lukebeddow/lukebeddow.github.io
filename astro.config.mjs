// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site is served from the root of lukebeddow.github.io, so no `base` is needed.
export default defineConfig({
  site: 'https://lukebeddow.github.io',
  integrations: [sitemap()],
  // The stylesheet is ~3 kB: inlining it removes a render-blocking request (Lighthouse mobile FCP).
  build: { format: 'directory', inlineStylesheets: 'always' },
});
