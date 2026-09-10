import { createFileRoute } from "@tanstack/react-router";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
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
  const c = useContent();
  const { hero, finalCta } = c.services;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      {c.practiceAreas.map((area, i) => (
        <PracticeAreaSlide key={area.id} area={area} index={i} />
      ))}

      <CTASection
        heading={finalCta.heading}
        body={finalCta.body}
        ctaLabel={finalCta.ctaLabel}
        ctaHref={`mailto:${c.firm.email}`}
      />
    </>
  );
}
