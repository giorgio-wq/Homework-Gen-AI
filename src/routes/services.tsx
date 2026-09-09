import { createFileRoute } from "@tanstack/react-router";
import { c } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { PracticeAreaSlide } from "@/components/PracticeAreaSlide";

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
  const { hero, provisionalNote } = c.services;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph}>
        <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground">
          {provisionalNote}
        </p>
      </PageHero>

      {c.practiceAreas.map((area, i) => (
        <PracticeAreaSlide key={area.id} area={area} index={i} />
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
