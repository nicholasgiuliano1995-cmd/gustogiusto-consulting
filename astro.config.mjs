// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real production domain before going live
// (used for canonical URLs, hreflang and OpenGraph tags).
const SITE = 'https://www.gustogiusto.example';

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
  vite: {
    plugins: [tailwindcss()],
  },
});
