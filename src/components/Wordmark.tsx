import { Link } from "@tanstack/react-router";
import { c } from "@/content/site";

/** Typographic wordmark. Replace the inner markup with an SVG logo later. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${c.firm.name} — home`}
      className="group inline-flex items-baseline gap-2 text-foreground"
    >
      <span
        className={`font-display leading-none tracking-tight ${
          compact ? "text-lg" : "text-2xl md:text-3xl"
        }`}
      >
        Studio Legale
      </span>
      <span
        className={`font-display italic leading-none text-accent ${
          compact ? "text-lg" : "text-2xl md:text-3xl"
        }`}
      >
        Caso
      </span>
    </Link>
  );
}
