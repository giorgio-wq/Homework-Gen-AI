import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultLocale, getContent, type Locale } from "@/content/site";

const STORAGE_KEY = "slc-locale";
const LOCALES: Locale[] = ["it", "en"];

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Holds the active language. Starts at the default locale so the server render
 * and the first client render match; after mount it adopts any previously saved
 * choice from localStorage. The chosen locale is persisted and mirrored onto
 * <html lang>. No URL changes — one address for the whole site.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (LOCALES as string[]).includes(saved)) {
        setLocaleState(saved as Locale);
      }
    } catch {
      /* localStorage may be unavailable; keep the default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore write failures */
    }
  }, []);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

/** Content for the currently selected locale. */
export function useContent() {
  const { locale } = useLocale();
  return getContent(locale);
}
