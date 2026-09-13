import { ArrowRight } from "lucide-react";

/** Closing call to action. `ctaHref` may be an internal route or an external target. */
export function CTASection({
  heading,
  body,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
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
        <a
          href={ctaHref}
          className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-sm border border-primary-foreground/30 px-7 text-sm transition-colors hover:border-accent hover:bg-accent"
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
