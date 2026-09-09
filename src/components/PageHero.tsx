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
        <h1 className="fade-up mt-5 max-w-4xl text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl">
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
