# AGENTS.md — Studio Legale Caso website

Bilingual (Italian default + English) marketing site for an Italian law firm,
built as an academic project. TanStack Start + Vite + React 19 + Tailwind v4.

- Repository: `giorgio-wq/Homework-Gen-AI`, branch `main`
- Live site: https://homework-gen-ai.giorgiogiancaspro.workers.dev
- Hosting: Cloudflare Workers, connected to this repo.
  **Every push to `main` is deployed to the live site automatically**, so keep
  `main` in a working state and never force-push or rewrite pushed history.

## Commands

```bash
npm install
npm run dev          # local server on http://localhost:8080
npx eslint . --fix   # also fixes Prettier formatting (Windows CRLF)
npx tsc --noEmit     # REQUIRED: the Vite build does NOT type-check
npm run build        # production build
```

Before committing, all three must pass: `npx eslint .` (0 errors),
`npx tsc --noEmit`, `npm run build`. The project uses strict TypeScript options
(including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`).

## Where things live

- `src/content/site.ts` — **all user-visible text**, in two locales: `it`
  (default) and `en`. Both objects must keep exactly the same keys and the same
  route `to` values. Components read the active locale with `useContent()` from
  `src/i18n/locale.tsx`; route `head()` meta uses the default-locale `c` export.
- `src/styles.css` — design tokens (colour palette) and utilities
  (`eyebrow`, `section-label`, `reveal-on-scroll`, …).
- `src/routes/` — pages: `index.tsx` (Home), `about.tsx`, `services.tsx`,
  `contact.tsx`; `__root.tsx` holds the layout, head tags and favicons.
- `src/components/` — `Header`, `Footer`, `LanguageSwitcher`, `SectionLink`,
  `ContactForm`, `PartnersShowcase` (About partners sequence),
  `PracticeAreaSlide` (Services slides). `src/components/ui/` is library code.
- `src/hooks/` — `use-reveal-on-scroll.ts` (staggered reveals),
  `use-smooth-scroll.ts` (site-wide Lenis smooth scroll).
- `public/brand/` — logo files and favicons; `public/partners/` — portraits.

## Rules

- **Never hardcode text in components.** Add or change copy in
  `src/content/site.ts`, in BOTH `it` and `en`.
- Keep the site light-only: do not add a dark theme or remove
  `color-scheme: light`.
- Palette: deep navy `#11152F` for headings and primary buttons, brand blue
  `#00009F` for links, numbers and accents, silver `#A0A0A0` only for the logo
  (never for text). Use the existing tokens, not new hex values.
- Do not add placeholders ("XXXX", "to be confirmed", …) or invent facts about
  the firm.
- Keep the academic disclaimer, and keep the contact form explicitly
  non-transmitting (it validates only; nothing is sent or stored).
- Partners are listed in alphabetical order by surname: Caso, Giancaspro,
  Riviello. The name is "Giovanni Battista Riviello".
- Scroll animations must keep content visible without JavaScript and respect
  `prefers-reduced-motion`.
