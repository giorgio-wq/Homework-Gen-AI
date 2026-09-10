import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  headline,
  paragraph,
  children,
}: {
  eyebrow: string;
  headline: string;
  paragraph?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-hairline">
      <div className="container-editorial py-16 md:py-24 lg:py-28">
        <p className="eyebrow fade-up">{eyebrow}</p>
        {/* Smaller base size + break-words: long Italian words (e.g.
            "sull'esperienza") must not overflow at 320px. */}
        <h1 className="fade-up mt-5 max-w-4xl break-words text-[2rem] leading-[1.05] sm:text-6xl lg:text-7xl">
          {headline}
        </h1>
        {paragraph ? (
          <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {paragraph}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
