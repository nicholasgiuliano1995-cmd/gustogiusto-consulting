# DEPLOY — Gusto Giusto

## 1. Build

```bash
npm install
npm run build
```

The production site is generated in the **`dist/`** folder. Upload the **contents** of `dist/` (not the folder itself) to the web root.

## 2. Before going live — replace the placeholders

| Placeholder | Where | What to do |
|---|---|---|
| `TODO_FORM_ID` | `src/components/ContactForm.astro` | In the Formspree dashboard open the form → the endpoint is `https://formspree.io/f/<ID>`; replace `TODO_FORM_ID` with that ID |
| ~~`TODO_EMAIL`~~ | done | `gustogiusto@yandex.ru` is set in `Footer.astro` and `ContactPage.astro` |
| ~~`TODO_WHATSAPP`~~ | done | `+39 329 363 9346` is set in `Footer.astro` and `ContactPage.astro` |
| `https://www.gustogiusto.example` | `astro.config.mjs` | Replace with the real domain (used for canonical, hreflang and OpenGraph URLs) |
| `public/og.png` | — | Placeholder social-share image (navy + gold). Replace with a branded 1200×630 image when available |
| `public/favicon.svg` | — | Placeholder "G" mark. Replace with the final logo when available |

After any change, run `npm run build` again and re-upload `dist/`.

## 3. Option A — reg.ru shared hosting (FTP / file manager)

1. In the reg.ru control panel, open your hosting → **File manager** (or get FTP credentials: host, username, password).
2. Navigate to the site's web root — usually `www/yourdomain.tld/` or `public_html/`.
3. Upload everything **inside** `dist/`: `index.html`, the `contatti/`, `es/`, `pt/`, `_astro/` folders, `favicon.svg`, `og.png`.
   - Via FTP: use FileZilla, connect, drag the contents of `dist/` into the web root.
   - Via file manager: zip the contents of `dist/`, upload the zip, extract it in the web root.
4. No server configuration is needed — the site is pure static HTML/CSS/JS. Clean URLs work out of the box because every page is a folder with its own `index.html` (`/es/`, `/contatti/`, …).
5. Enable HTTPS (free Let's Encrypt certificate) in the reg.ru panel if not already active.

## 4. Option B — Cloudflare Pages (recommended)

Connect this GitHub repository so every push deploys automatically:

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to access GitHub and select the repository `nicholasgiuliano1995-cmd/gustogiusto-consulting`.
3. Configure the build:
   - **Production branch:** `main`
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**. The first build takes ~1–2 minutes; you get a `*.pages.dev` URL immediately.
5. To use the real domain: Pages project → **Custom domains** → add the domain and follow the DNS instructions (instant if the domain's DNS is already on Cloudflare).

Every later `git push` to `main` triggers a new deployment automatically; pushes to other branches create preview deployments.

## 5. Site structure (for reference)

- `/` — Italian homepage · `/contatti/` — Italian contact page
- `/es/` — Spanish homepage · `/es/contacto/` — Spanish contact page
- `/pt/` — Portuguese homepage · `/pt/contato/` — Portuguese contact page
