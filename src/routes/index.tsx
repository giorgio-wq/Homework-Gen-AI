import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
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
  const { hero, intro, clients, servicesPreview, approach, team, finalCta } = c.home;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--hairline) 1px, transparent 1px)",
            backgroundSize: "8rem 100%",
            opacity: 0.7,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 hidden h-72 w-72 rounded-full border border-accent/25 lg:block"
        />
        <div className="container-editorial relative py-20 md:py-28 lg:py-36">
          <p className="eyebrow fade-up">{hero.eyebrow}</p>
          <h1 className="fade-up mt-6 max-w-5xl text-[2.75rem] leading-[0.98] sm:text-7xl lg:text-[5.75rem]">
            Legal expertise.
            <br />
            <span className="italic text-accent">Clear direction.</span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.paragraph}
          </p>
          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row">
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
            <Link
              to={team.cta.to}
              className="link-underline mt-8 inline-block text-sm text-accent"
            >
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
