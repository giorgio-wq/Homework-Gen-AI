import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/locale";
import type { Locale } from "@/content/site";

const LANGS = {
  it: { short: "IT", label: "Italiano" },
  en: { short: "EN", label: "English" },
} as const;
const ORDER: Locale[] = ["it", "en"];

/**
 * Language dropdown for the top bar. Shows the current language; opening it
 * reveals a small panel with both languages — the current one is dimmed
 * (lighter) and marked as selected, the other is selectable. Closes on outside
 * click or Escape, and works with mouse, touch and keyboard.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGS[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === "it" ? "Cambia lingua" : "Change language"}
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
          role="listbox"
          aria-label={locale === "it" ? "Lingua" : "Language"}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-sm border border-hairline bg-popover shadow-lg"
        >
          {ORDER.map((code) => {
            const lang = LANGS[code];
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
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
