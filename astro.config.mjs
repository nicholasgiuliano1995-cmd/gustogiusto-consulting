// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Live Cloudflare Pages URL — swap for https://gustogiustoconsulting.com once
// the custom domain is connected (used for canonical, hreflang, OG, sitemap).
const SITE = 'https://gustogiusto-consulting.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it', es: 'es', pt: 'pt-BR' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
