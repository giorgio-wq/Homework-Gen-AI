import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useContent } from "@/i18n/locale";
import { Wordmark } from "@/components/Wordmark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const c = useContent();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      panelRef.current?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-background/85 backdrop-blur-md">
        <div className="container-editorial grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20">
          <div className="min-w-0">
            <Wordmark />
          </div>

          <nav aria-label={c.ui.primaryNav} className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8">
              {c.nav.items.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 text-base font-semibold transition-colors hover:text-foreground ${
                        active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-hairline"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{c.nav.openMenu}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation — compact floating panel with a soft backdrop */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={c.ui.mobileNav}
          tabIndex={-1}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label={c.nav.closeMenu}
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="menu-backdrop-in absolute inset-0 cursor-default bg-foreground/10 backdrop-blur-[3px] focus:outline-none"
          />
          <div
            className="menu-panel-in absolute right-5 top-[4.75rem] w-[calc(100%-2.5rem)] max-w-sm overflow-hidden rounded-sm border border-hairline bg-background/90 shadow-[0_1.25rem_3rem_rgba(17,21,47,0.16)] backdrop-blur-md md:right-10 md:top-24 md:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-hairline"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{c.nav.closeMenu}</span>
              </button>
            </div>
            <nav
              aria-label={c.ui.mobileNav}
              data-lenis-prevent
              className="max-h-[calc(100dvh-6rem)] overflow-y-auto px-5 py-3"
            >
              <ul className="flex flex-col">
                {c.nav.items.map((item, i) => {
                  const active = pathname === item.to;
                  return (
                    <li key={item.to} className="border-b border-hairline">
                      <Link
                        to={item.to}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-display text-3xl ${
                            active ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
