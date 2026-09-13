import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useContent, useLocale } from "@/i18n/locale";
import type { Locale } from "@/content/site";

const LANGS = {
  it: { short: "IT", label: "Italiano" },
  en: { short: "EN", label: "English" },
} as const;
const ORDER: Locale[] = ["it", "en"];

/**
 * Language menu following the WAI-ARIA menu-button pattern. The trigger and
 * menu items remain real buttons, with a roving tab stop and arrow-key support.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const c = useContent();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const menuId = `language-menu-${generatedId.replace(/:/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Partial<Record<Locale, HTMLButtonElement | null>>>({});
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const pendingFocusRef = useRef<Locale | null>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }, []);

  const focusItem = useCallback((code: Locale) => {
    itemRefs.current[code]?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      const previous = previousFocusRef.current;
      const restore = restoreFocusRef.current;
      previousFocusRef.current = null;
      restoreFocusRef.current = true;
      if (previous && restore) {
        window.requestAnimationFrame(() => {
          if (document.contains(previous)) previous.focus();
        });
      }
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current;
    restoreFocusRef.current = true;
    const frame = window.requestAnimationFrame(() => {
      const requested = pendingFocusRef.current;
      pendingFocusRef.current = null;
      focusItem(requested ?? locale);
    });

    const onDown = (e: MouseEvent) => {
      // The clicked control should keep focus; Escape and an explicit language
      // choice are the cases where focus returns to this trigger.
      if (ref.current && !ref.current.contains(e.target as Node)) closeMenu(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", onDown);
    };
  }, [closeMenu, focusItem, locale, open]);

  const moveFocus = (direction: 1 | -1) => {
    const currentIndex = ORDER.findIndex(
      (code) => itemRefs.current[code] === document.activeElement,
    );
    const startIndex = currentIndex < 0 ? ORDER.indexOf(locale) : currentIndex;
    const nextIndex = (startIndex + direction + ORDER.length) % ORDER.length;
    focusItem(ORDER[nextIndex]!);
  };

  const current = LANGS[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const target = e.key === "ArrowDown" ? ORDER[0]! : ORDER[ORDER.length - 1]!;
            if (open) focusItem(target);
            else {
              pendingFocusRef.current = target;
              setOpen(true);
            }
          }
        }}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={c.ui.changeLanguage}
        className="inline-flex items-center gap-1.5 rounded-sm border border-hairline px-3 py-2 text-sm transition-colors hover:border-foreground"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="font-medium">{current.short}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={c.ui.languageMenu}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              moveFocus(1);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              moveFocus(-1);
            } else if (e.key === "Home") {
              e.preventDefault();
              focusItem(ORDER[0]!);
            } else if (e.key === "End") {
              e.preventDefault();
              focusItem(ORDER[ORDER.length - 1]!);
            } else if (e.key === "Escape") {
              e.preventDefault();
              closeMenu(true);
            } else if (e.key === "Tab") {
              // Let the browser advance to the next control after closing.
              closeMenu(false);
            }
          }}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-sm border border-hairline bg-popover shadow-lg"
        >
          {ORDER.map((code) => {
            const lang = LANGS[code];
            const active = code === locale;
            return (
              <li key={code} role="none">
                <button
                  ref={(element) => {
                    itemRefs.current[code] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setLocale(code);
                    closeMenu(true);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                    active ? "text-muted-foreground" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{lang.label}</span>
                  {active ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
