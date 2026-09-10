import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTASection({
  heading,
  body,
  ctaLabel,
  ctaTo,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaTo: "/" | "/about" | "/services" | "/contact";
}) {
  return (
    <section className="border-t border-hairline bg-primary text-primary-foreground">
      <div className="container-editorial grid gap-10 py-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:py-28">
        <div className="min-w-0">
          <h2 className="max-w-2xl text-[2.25rem] leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed opacity-75 md:text-base">{body}</p>
        </div>
        <Link
          to={ctaTo}
          className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-sm border border-primary-foreground/30 px-7 text-sm transition-colors hover:bg-accent hover:border-accent"
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
