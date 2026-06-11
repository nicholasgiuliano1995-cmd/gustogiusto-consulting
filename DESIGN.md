# Gusto Giusto — Design Plan

## Palette usage

- **Navy `#1B2A40`** is the ink and the ground. Hero, "La Rotta" route section and footer sit on full navy with cream type. It is never used as a small accent — it is the room the site lives in.
- **Cream `#F5EDD6`** carries the daylight sections (Chi siamo, Consulenza 360°, Come iniziare). A slightly lifted near-white (`#FBF7EA`) is used for cards on cream so separation comes from tone, not shadows.
- **Gold `#C9A84C`** appears only as hairlines (1px rules), the route line itself, oversized phase numerals, eyebrow labels, hover states and form focus rings. No gold fills larger than a button.

Rhythm: navy → cream → navy (route) → cream → navy-tinted → cream → navy (footer). The dark sections bookend and anchor; the route is deliberately the darkest, most theatrical moment.

## Type scale

| Role | Face | Size |
|---|---|---|
| Hero headline | Cormorant Garamond 600 | `clamp(2.6rem, 6vw, 4.75rem)`, lh 1.08 |
| Section headlines | Cormorant Garamond 600 | `clamp(2rem, 4vw, 3.25rem)` |
| Phase numerals | Cormorant Garamond 500 | `clamp(6rem, 16vw, 11rem)`, gold, lh 0.8 |
| Eyebrows / nav / labels | Inter 500 | 0.75rem, tracking 0.18em, uppercase |
| Body | Inter 400 | 1rem–1.125rem, lh 1.7 |

Cormorant never appears below ~2rem; everything functional is Inter.

## "La Rotta" mechanics

**Desktop (≥1024px):** the section pins (GSAP ScrollTrigger, `scrub: 1`). A horizontal track of four station panels translates left as the user scrolls (~3.5 viewport-heights of scroll distance). Behind the panels, one SVG path spans the entire track (`preserveAspectRatio="none"`, `vector-effect="non-scaling-stroke"`), an undulating line from the left edge (the cellar) to a destination marker at the right (the Russian market). Its `stroke-dashoffset` is scrubbed on the same timeline, so the line draws itself exactly in step with the journey. Station nodes are at 12.5 / 37.5 / 62.5 / 87.5% of the path; each station's numeral, title, duration and copy lift in via `containerAnimation` triggers as its segment enters view, and its node dot fills gold.

**Mobile (<1024px):** no pinning. Stations stack vertically along a left-hand vertical gold line that scales (`scaleY` 0→1, origin top, scrubbed) as the user scrolls through the section; each station fades up with its own trigger.

**`prefers-reduced-motion`:** all GSAP initialisation is skipped. Every hidden/offset state is applied only via JS (`gsap.from`), so without JS or with reduced motion the section renders fully visible, line fully drawn, vertically stacked content — complete and legible.

## Homepage wireframe (ASCII)

```
┌──────────────────────────────────────────────────────────┐
│ GUSTO GIUSTO        metodo  360°  perché  iniziare  IT ES PT  [Parliamone] │ ← sticky, navy
├──────────────────────────────────────────────────────────┤
│ NAVY · full viewport · faint drifting gold particles     │
│ │ (thin gold vertical rule)                              │
│ │ Il vostro vino merita il mercato russo.                │
│ │ Noi sappiamo come portarcelo.                          │
│ │ subline ……………………………………………                              │
│ │ [Parliamone →]                                          │
├──────────────────────────────────────────────────────────┤
│ CREAM · CHI SIAMO                                        │
│ eyebrow ─ headline ─ short paragraph                     │
│ ─gold─            ─gold─              ─gold─             │
│ Mosca · S.Pietr.  Sommelier locali    Consulenza 360°    │
├──────────────────────────────────────────────────────────┤
│ NAVY · LA ROTTA (pinned, scrolls horizontally)           │
│   ①────~────②────~────③────~────④──────────▶ RU         │
│   huge gold numeral · title · duration · copy · bullets  │
│   "Tempi complessivi Fasi 1–3: 6–8 mesi. …"              │
├──────────────────────────────────────────────────────────┤
│ CREAM · CONSULENZA 360°                                  │
│ ┌─gold──────┐ ┌─gold──────┐ ┌─gold──────┐                │
│ │ Wine      │ │ Food      │ │ Legal &   │                │
│ │           │ │           │ │ Export    │                │
│ └───────────┘ └───────────┘ └───────────┘                │
├──────────────────────────────────────────────────────────┤
│ NAVY-TINTED · PERCHÉ LA RUSSIA, PERCHÉ NOI               │
│ two-column: headline | confident short paragraphs        │
├──────────────────────────────────────────────────────────┤
│ CREAM · COME INIZIARE                                    │
│ 1 ─────── 2 ─────── 3        [Parliamone →]              │
├──────────────────────────────────────────────────────────┤
│ NAVY FOOTER · wordmark · Mosca · SPb · email · WhatsApp  │
└──────────────────────────────────────────────────────────┘
```

## Self-critique (before coding)

Things that would make this read like a generic AI landing page, and what is done instead:

1. **Icon grids.** The 360° section and the steps section would normally get three cards with line icons. → No icons anywhere on the site. Cards are typographic: a 1px gold top rule, a Cormorant title, Inter body. Steps are numbered with small gold Cormorant numerals.
2. **Animated stat counters.** "Credibility strips" usually count up to invented numbers. → The three credibility lines are static, factual, unnumbered ("Mosca · San Pietroburgo", not "2 offices, 150+ clients").
3. **Centered hero with gradient blob.** → Hero is left-aligned against a thin gold vertical rule; the ambient layer is a barely-visible particle drift, navy stays flat.
4. **Rounded-XL cards with soft shadows.** → Radius capped at 4px (2px on buttons), separation by tone and hairlines only.
5. **Exclamation-mark CTAs and urgency copy.** → One CTA verb per language ("Parliamone"), repeated, never varied for "punchiness".
6. **The route becoming a gimmick.** Risk: horizontal scroll sections often trap the scroll or stutter. → Scrub is tied 1:1 to native scroll (no scroll-jacking easing), pin distance is finite and modest, and the whole mechanism is bypassed on mobile and reduced-motion.

Revision applied after critique: an earlier draft had gold-filled phase number badges and a fourth "stats" row under the hero — both removed; the numerals are now unboxed type, and credibility lives only in Section B.
