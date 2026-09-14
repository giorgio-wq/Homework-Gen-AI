import { Link } from "@tanstack/react-router";
import { useContent } from "@/i18n/locale";

/** Typographic wordmark. Replace the inner markup with an SVG logo later. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  const c = useContent();
  // On narrow phones the size scales with the viewport so the wordmark stays on one line
  // next to the language switcher and menu button.
  const size = compact
    ? "text-lg"
    : "text-[clamp(0.9rem,calc((100vw_-_12.5rem)/8.6),1.5rem)] md:text-3xl";
  return (
    <Link
      to="/"
      resetScroll
      aria-label={`${c.firm.name} — ${c.ui.homeLink}`}
      className="group inline-flex items-baseline gap-2 whitespace-nowrap text-foreground"
    >
      <span className={`font-display leading-none tracking-tight ${size}`}>Studio Legale</span>
      <span className={`font-display italic leading-none text-accent ${size}`}>Caso</span>
    </Link>
  );
}
