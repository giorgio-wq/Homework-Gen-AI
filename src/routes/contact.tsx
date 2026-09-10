import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: c.contact.meta.title },
      { name: "description", content: c.contact.meta.description },
      { property: "og:title", content: c.contact.meta.title },
      { property: "og:description", content: c.contact.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { hero, details, map, links } = c.contact;
  const [rows] = useState(() => [
    details.location,
    details.address,
    details.phone,
    details.email,
    details.hours,
  ]);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      {/* Firm details + map, side by side (map drops below the details on mobile) */}
      <section className="container-editorial grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <h2 className="text-2xl md:text-3xl">{details.heading}</h2>
          <dl className="mt-8">
            {rows.map((row) => (
              <div key={row.label} className="border-t border-hairline py-5">
                <dt className="eyebrow">{row.label}</dt>
                <dd className="mt-2 text-base">{row.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Related pages" className="mt-10">
            <h3 className="eyebrow">{links.heading}</h3>
            <ul className="mt-4 space-y-3">
              {links.items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group inline-flex items-center gap-3 text-sm">
                    <span className="link-underline">{item.label}</span>
                    <ArrowRight
                      className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Simple visual map placeholder — no third-party embed */}
        <div
          role="img"
          aria-label={`${map.label}. ${map.note}`}
          className="relative flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-sm border border-hairline bg-secondary lg:aspect-[4/5]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)",
              backgroundSize: "3rem 3rem",
              opacity: 0.7,
            }}
          />
          <div aria-hidden="true" className="absolute h-4 w-4 rounded-full bg-accent" />
          <div
            aria-hidden="true"
            className="absolute h-16 w-16 rounded-full border border-accent/40"
          />
          <p className="absolute bottom-4 left-4 right-4 text-xs text-muted-foreground">
            {map.note}
          </p>
        </div>
      </section>

      {/* Send a message — full-width box below */}
      <section className="border-t border-hairline bg-secondary/40">
        <div className="container-editorial py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
