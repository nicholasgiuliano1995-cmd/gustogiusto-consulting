// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Production domain — drives canonical URLs, hreflang, OpenGraph, sitemap.
const SITE = 'https://gustogiustoconsulting.com';

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
