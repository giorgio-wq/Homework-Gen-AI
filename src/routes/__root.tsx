import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AcademicDisclaimer } from "@/components/AcademicDisclaimer";
import { c as defaultContent } from "@/content/site";
import { LocaleProvider, useContent, useLocale } from "@/i18n/locale";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <LocaleProvider>
      <NotFoundContent />
    </LocaleProvider>
  );
}

function NotFoundContent() {
  const c = useContent();
  return (
    <>
      <LocalizedDocumentMeta titleOverride={`${c.ui.notFound.heading} — ${c.firm.name}`} />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-ink">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">{c.ui.notFound.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{c.ui.notFound.body}</p>
          <p className="mt-4 border-l-2 border-accent pl-4 text-left text-sm text-muted-foreground">
            {c.ui.confidentialWarning}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {c.ui.notFound.cta}
            </Link>
          </div>
          <AcademicDisclaimer className="mt-8 text-left" />
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <LocaleProvider>
      <ErrorContent error={error} reset={reset} />
    </LocaleProvider>
  );
}

function ErrorContent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const c = useContent();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <LocalizedDocumentMeta titleOverride={`${c.ui.error.heading} — ${c.firm.name}`} />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {c.ui.error.heading}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{c.ui.error.body}</p>
          <p className="mt-4 border-l-2 border-accent pl-4 text-left text-sm text-muted-foreground">
            {c.ui.confidentialWarning}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {c.ui.error.retry}
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {c.ui.error.home}
            </a>
          </div>
          <AcademicDisclaimer className="mt-8 text-left" />
        </div>
      </div>
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Light-only palette. "only light" is the opt-out from Chrome's automatic
      // dark theme; plain "light" does not prevent it.
      { name: "color-scheme", content: "only light" },
      // Browser UI (address bar on mobile) in the site's ivory.
      { name: "theme-color", content: "#f8f7f3" },
      { title: defaultContent.siteMeta.title },
      { name: "description", content: defaultContent.siteMeta.description },
      { name: "robots", content: defaultContent.siteMeta.robots },
      { property: "og:site_name", content: "Studio Legale Caso" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: defaultContent.siteMeta.title },
      { property: "og:description", content: defaultContent.siteMeta.description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: defaultContent.siteMeta.title },
      { name: "twitter:description", content: defaultContent.siteMeta.description },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&display=swap",
      },
      // "SLC" monogram (public/brand/favicon/). The SVG in that folder is left
      // unlinked on purpose: it draws live text in system fonts, so it would
      // look different on every device. The PNGs are pre-rendered and stable.
      { rel: "icon", href: "/brand/favicon/favicon-slc-16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/brand/favicon/favicon-slc-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/brand/favicon/favicon-slc-48.png", type: "image/png", sizes: "48x48" },
      {
        rel: "icon",
        href: "/brand/favicon/favicon-slc-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      { rel: "apple-touch-icon", href: "/brand/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function setMeta(attribute: "name" | "property", key: string, value: string) {
  const metas = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`),
  );
  if (metas.length === 0) {
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    meta.content = value;
    document.head.appendChild(meta);
    return;
  }
  metas.forEach((meta) => {
    meta.content = value;
  });
}

/**
 * Route heads are rendered before the client knows the localStorage choice.
 * Keep that safe Italian SSR default, then synchronize the browser metadata
 * whenever the selected locale or route changes.
 */
function LocalizedDocumentMeta({ titleOverride }: { titleOverride?: string } = {}) {
  const { locale } = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const c = useContent();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const pageMeta =
      normalizedPath === "/about"
        ? c.about.meta
        : normalizedPath === "/services"
          ? c.services.meta
          : normalizedPath === "/contact"
            ? c.contact.meta
            : c.home.meta;

    document.documentElement.lang = locale;
    const title = titleOverride ?? pageMeta.title;
    document.title = title;
    setMeta("name", "description", c.siteMeta.description);
    setMeta("name", "robots", c.siteMeta.robots);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", c.siteMeta.description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", c.siteMeta.description);
  }, [c, locale, pathname, titleOverride]);

  return null;
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Rendered inside LocaleProvider so the label follows the chosen language. */
function SkipLink() {
  const c = useContent();
  return (
    <a
      href="#main"
      data-skip-link
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      {c.ui.skipToContent}
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <LocalizedDocumentMeta />
        <SkipLink />
        <Header />
        <main id="main" className="min-h-[60vh]">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </LocaleProvider>
    </QueryClientProvider>
  );
}
