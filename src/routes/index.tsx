import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
import { CTASection } from "@/components/CTASection";
import { ServicePreview } from "@/components/ServicePreview";
import { PartnerCard } from "@/components/PartnerCard";
import { SectionLink } from "@/components/SectionLink";
import { revealItem, useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { PARTNERS_ANCHOR } from "@/lib/anchors";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: c.home.meta.title },
      { name: "description", content: c.siteMeta.description },
      { name: "robots", content: c.siteMeta.robots },
      { property: "og:title", content: c.home.meta.title },
      { property: "og:description", content: c.siteMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.home.meta.title },
      { name: "twitter:description", content: c.siteMeta.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const c = useContent();
  const { hero, intro, clients, servicesPreview, approach, team, finalCta } = c.home;
  // Client groups rise in one by one (~0.35s apart); practice areas drop in
  // like a roller blind, a little quicker since there are seven of them.
  const [clientsRef, clientsState] = useRevealOnScroll<HTMLUListElement>();
  const [areasRef, areasState] = useRevealOnScroll<HTMLDivElement>();

  return (
    <>
      {/* Hero — the logo's own blue stripe is extended across the section as a
          broken rule: message above it, calls to action below it. The logo is
          split into mark + tagline so the CSS rule sits exactly where the
          original stripe was. */}
      <section className="overflow-hidden border-b border-hairline">
        <div className="container-editorial py-16 md:py-24 lg:py-28">
          <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16">
            {/* Message — above the rule */}
            <div className="fade-up mb-8 lg:col-start-1 lg:row-start-1 lg:mb-0 lg:self-end lg:pb-10">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-6 break-words text-[2.5rem] leading-[0.98] sm:text-5xl lg:text-6xl">
                {hero.headlineLead}
                <br />
                <span className="italic text-accent">{hero.headlineAccent}</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {hero.paragraph}
              </p>
            </div>

            {/* Calls to action — below the rule */}
            <div className="fade-up mb-12 flex flex-col gap-3 sm:flex-row lg:col-start-1 lg:row-start-3 lg:mb-0 lg:self-start lg:pt-10">
              <Link
                to={hero.primaryCta.to}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-primary px-7 text-sm text-primary-foreground transition-colors hover:bg-accent"
              >
                {hero.primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to={hero.secondaryCta.to}
                className="inline-flex h-14 items-center justify-center rounded-sm border border-hairline px-7 text-sm transition-colors hover:border-foreground"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>

            {/* Logo mark — sits directly on the rule */}
            <img
              src="/brand/studio-legale-caso-logo-mark.webp"
              alt={c.firm.name}
              width={955}
              height={568}
              decoding="async"
              className="fade-up mx-auto h-auto w-full max-w-sm lg:col-start-2 lg:row-start-1 lg:mx-0 lg:w-[28rem] lg:max-w-none lg:self-end xl:w-[34rem]"
            />

            {/* The stripe, continuing the logo's own blue bar */}
            <div
              aria-hidden="true"
              className="mx-auto h-2 w-full max-w-sm bg-accent lg:col-start-2 lg:row-start-2 lg:mx-0 lg:h-3 lg:w-[28rem] lg:max-w-none xl:h-4 xl:w-[34rem]"
            />

            {/* Logo tagline — sits directly under the rule */}
            <img
              src="/brand/studio-legale-caso-logo-tagline.webp"
              alt=""
              aria-hidden="true"
              width={955}
              height={72}
              decoding="async"
              className="mx-auto h-auto w-full max-w-sm lg:col-start-2 lg:row-start-3 lg:mx-0 lg:w-[28rem] lg:max-w-none lg:self-start xl:w-[34rem]"
            />

            {/* Extended segment of the stripe across the text column (broken by
                the column gap, which separates logo from copy) */}
            <div
              aria-hidden="true"
              className="hidden bg-accent lg:col-start-1 lg:row-start-2 lg:block lg:h-3 lg:w-full xl:h-4"
            />
          </div>
        </div>
      </section>

      {/* Firm introduction */}
      <section className="container-editorial grid gap-12 pt-20 pb-12 md:grid-cols-12 md:pt-28 md:pb-16">
        <div className="md:col-span-5">
          <p className="section-label">{intro.eyebrow}</p>
          <dl className="mt-8">
            {intro.facts.map((fact) => (
              <div key={fact.label} className="border-t border-hairline py-5">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 font-display text-xl leading-snug text-ink md:text-2xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-7">
          <h2 className="max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">{intro.heading}</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro.body}
          </p>
        </div>
      </section>

      {/* Client groups */}
      <section className="border-t border-hairline bg-secondary/50">
        <div className="container-editorial py-12 md:py-16">
          <h2 className="max-w-3xl text-[2rem] leading-[1.08] sm:text-5xl">{clients.heading}</h2>
          {/* Each entry carries its own hairline rule instead of sitting in a
              filled cell, so an odd number of entries simply leaves white space
              rather than an empty box. Entries appear in sequence. */}
          <ul
            ref={clientsRef}
            className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-x-14"
          >
            {clients.items.map((item, i) => {
              const reveal = revealItem(clientsState, i, { stagger: 350 });
              return (
                <li
                  key={item.title}
                  className={`border-t border-hairline pt-6 ${reveal.className}`}
                  style={reveal.style}
                >
                  <h3 className="text-2xl leading-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.note}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Services preview */}
      <section className="container-editorial pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <h2 className="min-w-0 max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">
            {servicesPreview.heading}
          </h2>
          <SectionLink to={servicesPreview.link.to} className="shrink-0 self-start md:self-end">
            {servicesPreview.link.label}
          </SectionLink>
        </div>
        {/* Practice areas cascade down one after another. */}
        <div ref={areasRef} className="mt-12">
          {c.practiceAreas.map((area, i) => {
            const reveal = revealItem(areasState, i, { stagger: 220, from: "above" });
            return (
              <div key={area.id} className={reveal.className} style={reveal.style}>
                <ServicePreview area={area} />
              </div>
            );
          })}
          <div className="border-t border-hairline" />
        </div>
      </section>

      {/* Approach / values */}
      <section className="border-y border-hairline bg-secondary/50">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="section-label">{approach.eyebrow}</p>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-5xl">{approach.heading}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="max-w-2xl border-l-2 border-accent pl-6 text-base leading-relaxed md:text-lg">
              {approach.body}
            </p>
            <SectionLink to={approach.link.to} className="mt-10">
              {approach.link.label}
            </SectionLink>
          </div>
        </div>
      </section>

      {/* Professionals preview */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="section-label">{team.eyebrow}</p>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-5xl">{team.heading}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {team.body}
            </p>
            <SectionLink to={team.cta.to} hash={PARTNERS_ANCHOR} className="mt-10">
              {team.cta.label}
            </SectionLink>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            {c.partners.map((p) => (
              <PartnerCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={finalCta.heading}
        body={finalCta.body}
        ctaLabel={finalCta.ctaLabel}
        ctaHref={`mailto:${c.firm.email}`}
      />
    </>
  );
}
