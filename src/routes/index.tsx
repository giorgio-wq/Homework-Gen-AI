import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
import { CTASection } from "@/components/CTASection";
import { ServicePreview } from "@/components/ServicePreview";
import { PartnerCard } from "@/components/PartnerCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: c.home.meta.title },
      { name: "description", content: c.home.meta.description },
      { property: "og:title", content: c.home.meta.title },
      { property: "og:description", content: c.home.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const c = useContent();
  const { hero, intro, clients, servicesPreview, approach, team, finalCta } = c.home;

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
              <h1 className="mt-6 text-[2.75rem] leading-[0.98] sm:text-5xl lg:text-6xl">
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
              alt="Studio Legale Caso – Associazione Professionale"
              width={955}
              height={568}
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
      <section className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow">{intro.eyebrow}</p>
          <dl className="mt-8 border-t border-hairline pt-4">
            <dt className="eyebrow">{intro.foundedLabel}</dt>
            <dd className="mt-1 font-display text-4xl">
              {c.firm.foundedPlaceholder}
              <span className="ml-3 align-middle text-xs uppercase tracking-widest text-muted-foreground">
                {intro.foundedNote}
              </span>
            </dd>
          </dl>
        </div>
        <div className="md:col-span-8">
          <h2 className="max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">{intro.heading}</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro.body}
          </p>
        </div>
      </section>

      {/* Client groups */}
      <section className="border-t border-hairline bg-secondary/50">
        <div className="container-editorial py-20 md:py-28">
          <p className="eyebrow">{clients.eyebrow}</p>
          <h2 className="mt-5 max-w-3xl text-[2rem] leading-[1.08] sm:text-5xl">
            {clients.heading}
          </h2>
          <ul className="mt-14 grid gap-px bg-hairline sm:grid-cols-2">
            {clients.items.map((item, i) => (
              <li key={item.title} className="bg-background p-7 md:p-10">
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl md:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services preview */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow">{servicesPreview.eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">
              {servicesPreview.heading}
            </h2>
          </div>
          <Link
            to={servicesPreview.link.to}
            className="link-underline shrink-0 self-start text-sm text-accent md:self-end"
          >
            {servicesPreview.link.label}
          </Link>
        </div>
        <div className="mt-12">
          {c.practiceAreas.map((area) => (
            <ServicePreview key={area.id} area={area} />
          ))}
          <div className="border-t border-hairline" />
        </div>
      </section>

      {/* Approach / values */}
      <section className="border-y border-hairline bg-secondary/50">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="eyebrow">{approach.eyebrow}</p>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-4xl">{approach.heading}</h2>
          </div>
          <div className="md:col-span-7">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-2xl leading-snug md:text-[2rem]">
                {c.firm.valueStatement}
              </p>
            </blockquote>
            <dl className="mt-12 grid gap-8 sm:grid-cols-3">
              {approach.principles.map((p) => (
                <div key={p.title} className="border-t border-hairline pt-4">
                  <dt className="text-lg">{p.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Professionals preview */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-4xl">{team.heading}</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {team.body}
            </p>
            <Link to={team.cta.to} className="link-underline mt-8 inline-block text-sm text-accent">
              {team.cta.label}
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7">
            {c.partners.map((p) => (
              <PartnerCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={finalCta.heading}
        body={finalCta.body}
        ctaLabel={finalCta.cta.label}
        ctaTo={finalCta.cta.to}
      />
    </>
  );
}
