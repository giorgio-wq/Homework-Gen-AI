import { createFileRoute } from "@tanstack/react-router";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
import { PageHero } from "@/components/PageHero";
import { PartnersShowcase } from "@/components/PartnersShowcase";
import { CTASection } from "@/components/CTASection";
import { revealItem, useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: c.about.meta.title },
      { name: "description", content: c.siteMeta.description },
      { name: "robots", content: c.siteMeta.robots },
      { property: "og:title", content: c.about.meta.title },
      { property: "og:description", content: c.siteMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.about.meta.title },
      { name: "twitter:description", content: c.siteMeta.description },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const c = useContent();
  const { hero, history, approach, team } = c.about;
  const [timelineRef, timelineState] = useRevealOnScroll<HTMLOListElement>();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      {/* History + timeline (the dates come in one after another) */}
      <section className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <h2 className="text-[2rem] leading-[1.08] sm:text-5xl">{history.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-xl">
            {history.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ol ref={timelineRef} className="md:col-span-7 md:pt-16">
          {history.timeline.map((entry, i) => {
            const reveal = revealItem(timelineState, i, { stagger: 350 });
            return (
              <li
                key={entry.year}
                className={`grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-5 border-t border-hairline py-6 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-8 md:py-7 ${reveal.className}`}
                style={reveal.style}
              >
                <span className="font-display text-2xl text-accent md:text-3xl">{entry.year}</span>
                <p className="text-base leading-relaxed md:text-lg">{entry.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-y border-hairline bg-secondary/50">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <h2 className="text-[2rem] leading-[1.08] sm:text-5xl">{approach.heading}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="max-w-2xl border-l-2 border-accent pl-6 text-base leading-relaxed md:text-xl">
              {approach.body}
            </p>
          </div>
        </div>
      </section>

      {/* The team heading sits inside the partners stage, directly above the
          portraits, instead of in a section of its own. */}
      <PartnersShowcase partners={c.partners} heading={team.heading} />

      <CTASection
        heading={c.home.finalCta.heading}
        body={c.home.finalCta.body}
        ctaLabel={c.home.finalCta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
