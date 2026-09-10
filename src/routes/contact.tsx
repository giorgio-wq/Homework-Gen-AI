import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";
import { useContent } from "@/i18n/locale";
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
  const c = useContent();
  const { hero, details, map, links } = c.contact;
  const rows = [details.location, details.address, details.phone, details.email, details.hours];

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

        {/* Google Maps embed (no API key needed) centred on the firm address */}
        <div>
          <iframe
            title={map.label}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(map.query)}&z=16&output=embed`}
            className="aspect-[16/11] w-full rounded-sm border border-hairline lg:aspect-[4/5]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.query)}`}
            target="_blank"
            rel="noreferrer"
            className="link-underline mt-3 inline-block text-sm text-accent"
          >
            {map.linkLabel}
          </a>
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
