import { createFileRoute } from "@tanstack/react-router";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { PracticeAreaList } from "@/components/PracticeAreaList";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: c.services.meta.title },
      { name: "description", content: c.siteMeta.description },
      { name: "robots", content: c.siteMeta.robots },
      { property: "og:title", content: c.services.meta.title },
      { property: "og:description", content: c.siteMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.services.meta.title },
      { name: "twitter:description", content: c.siteMeta.description },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  const c = useContent();
  const { hero, listHint, finalCta } = c.services;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      <section className="container-editorial py-16 md:py-20">
        <p className="eyebrow">{listHint}</p>
        <div className="mt-8">
          <PracticeAreaList areas={c.practiceAreas} />
        </div>
      </section>

      <CTASection
        heading={finalCta.heading}
        body={finalCta.body}
        ctaLabel={finalCta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
