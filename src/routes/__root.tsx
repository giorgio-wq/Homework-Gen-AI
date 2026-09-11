import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleProvider, useContent } from "@/i18n/locale";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const c = useContent();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{c.ui.notFound.heading}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{c.ui.notFound.body}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {c.ui.notFound.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const c = useContent();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {c.ui.error.heading}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{c.ui.error.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
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
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Light-only palette: keeps phones and browsers in dark mode from
      // auto-inverting the site.
      { name: "color-scheme", content: "light" },
      { title: "Studio Legale Caso" },
      { name: "description", content: "Independent law firm in Altamura, Puglia, Italy." },
      { property: "og:site_name", content: "Studio Legale Caso" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
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
