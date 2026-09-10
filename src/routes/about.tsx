import { createFileRoute } from "@tanstack/react-router";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
import { PageHero } from "@/components/PageHero";
import { PartnersShowcase } from "@/components/PartnersShowcase";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: c.about.meta.title },
      { name: "description", content: c.about.meta.description },
      { property: "og:title", content: c.about.meta.title },
      { property: "og:description", content: c.about.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const c = useContent();
  const { hero, history, approach, team } = c.about;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      <section className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow">{history.eyebrow}</p>
          <dl className="mt-8 border-t border-hairline pt-4">
            <dt className="eyebrow">{history.foundedLabel}</dt>
            <dd className="mt-1 font-display text-4xl">
              {c.firm.foundedPlaceholder}
              <span className="ml-3 align-middle text-xs uppercase tracking-widest text-muted-foreground">
                {history.foundedNote}
              </span>
            </dd>
          </dl>
        </div>
        <div className="md:col-span-8">
          <h2 className="max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">{history.heading}</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {history.body}
          </p>
        </div>
      </section>

      <section className="border-y border-hairline bg-secondary/50">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="eyebrow">{approach.eyebrow}</p>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-4xl">{approach.heading}</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {approach.body}
            </p>
          </div>
          <div className="md:col-span-7">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-2xl leading-snug md:text-[2rem]">
                {c.firm.valueStatement}
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-[2rem] leading-[1.08] sm:text-5xl">
              {team.heading}
            </h2>
          </div>
          <dl className="shrink-0 border-t border-hairline pt-4 md:text-right">
            <dt className="eyebrow">{team.collaboratorsLabel}</dt>
            <dd className="font-display text-3xl">{team.collaboratorsValue}</dd>
          </dl>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {team.body}
        </p>
      </section>

      <PartnersShowcase partners={c.partners} />

      <CTASection
        heading={c.home.finalCta.heading}
        body={c.home.finalCta.body}
        ctaLabel={c.home.finalCta.cta.label}
        ctaTo={c.home.finalCta.cta.to}
      />
    </>
  );
}
