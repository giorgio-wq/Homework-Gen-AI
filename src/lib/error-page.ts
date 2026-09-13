import { defaultLocale, getContent, type Locale } from "../content/site";

/** Pick the server-rendered copy from the request's preferred language. */
export function getRequestLocale(request: Request): Locale {
  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return accepted.split(",")[0]?.trim().startsWith("en") ? "en" : defaultLocale;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

/**
 * Minimal SSR fallback for catastrophic errors. It intentionally does not
 * depend on the client bundle, but keeps the site's palette, copy and
 * academic notice. The locale comes from Accept-Language because localStorage
 * is not available before the app hydrates.
 */
export function renderErrorPage(locale: Locale = defaultLocale): string {
  const c = getContent(locale);
  const title = `${c.ui.error.heading} — ${c.firm.name}`;
  const e = (value: string) => escapeHtml(value);

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="only light" />
    <meta name="theme-color" content="#f8f7f3" />
    <meta name="robots" content="${e(c.siteMeta.robots)}" />
    <meta name="description" content="${e(c.siteMeta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${e(title)}" />
    <meta property="og:description" content="${e(c.siteMeta.description)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${e(title)}" />
    <meta name="twitter:description" content="${e(c.siteMeta.description)}" />
    <title>${e(title)}</title>
    <style>
      :root { color-scheme: only light; --ivory: #f8f7f3; --ink: #11152f; --muted: #5f626b; --accent: #00009f; --hairline: #d7d8de; }
      * { box-sizing: border-box; }
      body { font-family: Archivo, ui-sans-serif, system-ui, sans-serif; background: var(--ivory); color: var(--ink); display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 2rem 1.25rem; }
      main { width: min(100%, 42rem); }
      .card { border-top: 2px solid var(--accent); padding: 2rem 0 0; }
      .wordmark { display: inline-block; color: var(--ink); font-family: Georgia, ui-serif, serif; font-size: clamp(1.4rem, 4vw, 2rem); letter-spacing: -0.03em; text-decoration: none; }
      .wordmark em { color: var(--accent); font-style: italic; }
      h1 { font-family: Georgia, ui-serif, serif; font-size: clamp(2rem, 7vw, 4rem); font-weight: 400; letter-spacing: -0.04em; line-height: 1.05; margin: 3.5rem 0 1rem; }
      p { color: var(--muted); line-height: 1.65; margin: 0; }
      .warning { border-left: 2px solid var(--accent); margin-top: 1.5rem; padding-left: 1rem; font-size: .875rem; }
      .disclaimer { border-top: 1px solid var(--hairline); margin-top: 2.5rem; padding-top: 1rem; font-size: .75rem; }
      .actions { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 2rem; }
      a, button { border-radius: .25rem; cursor: pointer; font: inherit; padding: .75rem 1.25rem; text-decoration: none; }
      .primary { background: var(--ink); border: 1px solid var(--ink); color: #fff; }
      .secondary { background: transparent; border: 1px solid var(--hairline); color: var(--ink); }
      :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .001ms !important; animation-duration: .001ms !important; } }
    </style>
  </head>
  <body>
    <main aria-labelledby="error-title">
      <div class="card">
        <a class="wordmark" href="/">Studio Legale <em>Caso</em></a>
        <h1 id="error-title">${e(c.ui.error.heading)}</h1>
        <p>${e(c.ui.error.body)}</p>
        <p class="warning">${e(c.ui.confidentialWarning)}</p>
        <div class="actions">
          <button class="primary" type="button" onclick="window.location.reload()">${e(c.ui.error.retry)}</button>
          <a class="secondary" href="/">${e(c.ui.error.home)}</a>
        </div>
        <p class="disclaimer">${e(c.firm.disclaimer)}</p>
      </div>
    </main>
  </body>
</html>`;
}
