import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Route = "/" | "/about" | "/services" | "/contact";

/**
 * "Read more"-style link closing a section. Sized and ruled so it reads as a
 * deliberate call to action rather than a small inline text link; it stays in
 * the ink colour and only turns brand blue on hover.
 */
export function SectionLink({
  to,
  hash,
  children,
  className = "",
}: {
  to: Route;
  /** Optional in-page anchor on the target page (without the "#"). */
  hash?: string | undefined;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      className={`group inline-flex items-center gap-3 border-b border-foreground/25 pb-1.5 text-base font-medium text-foreground transition-colors hover:border-accent hover:text-accent md:text-lg ${className}`}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
