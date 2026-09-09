import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: c.services.meta.title },
      { name: "description", content: c.services.meta.description },
      { property: "og:title", content: c.services.meta.title },
      { property: "og:description", content: c.services.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  const { hero, provisionalNote, longDescriptionPlaceholder, cta } = c.services;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph}>
        <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground">
          {provisionalNote}
        </p>
      </PageHero>

      {c.practiceAreas.map((area) => (
        <section
          key={area.id}
          id={area.id}
          aria-labelledby={`${area.id}-heading`}
          className="border-b border-hairline"
        >
          <div className="container-editorial grid gap-8 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-4">
              <span className="font-display text-5xl text-accent md:text-6xl">{area.number}</span>
              <h2 id={`${area.id}-heading`} className="mt-4 text-3xl md:text-4xl">
                {area.title}
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-2xl text-base leading-relaxed md:text-lg">{area.summary}</p>
              <p className="mt-6 max-w-2xl border-t border-hairline pt-6 text-sm leading-relaxed text-muted-foreground">
                {longDescriptionPlaceholder}
              </p>
              <Link
                to={cta.to}
                className="group mt-8 inline-flex items-center gap-3 text-sm text-accent"
              >
                <span className="link-underline">{cta.label}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      ))}

      <CTASection
        heading={c.home.finalCta.heading}
        body={c.home.finalCta.body}
        ctaLabel={c.home.finalCta.cta.label}
        ctaTo={c.home.finalCta.cta.to}
      />
    </>
  );
}
