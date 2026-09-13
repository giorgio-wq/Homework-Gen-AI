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
      { name: "description", content: c.siteMeta.description },
      { name: "robots", content: c.siteMeta.robots },
      { property: "og:title", content: c.contact.meta.title },
      { property: "og:description", content: c.siteMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.contact.meta.title },
      { name: "twitter:description", content: c.siteMeta.description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const c = useContent();
  const { hero, details, map, links } = c.contact;
  const mailto = `mailto:${c.firm.email}`;
  const mapsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} paragraph={hero.paragraph} />

      {/* Firm details + map, side by side (map drops below the details on mobile) */}
      <section className="container-editorial grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <h2 className="text-2xl md:text-3xl">{details.heading}</h2>

          {/* Locations */}
          <h3 className="eyebrow mt-8">{details.locationsLabel}</h3>
          <ul className="mt-2">
            {details.locations.map((location) => (
              <li key={location.name} className="border-t border-hairline py-5">
                <p className="text-base font-medium">{location.name}</p>
                <address className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">
                  {location.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={mapsUrl(location.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-2 inline-block text-sm text-accent"
                >
                  {details.directionsLabel}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact methods */}
          <dl className="mt-2">
            <div className="border-t border-hairline py-5">
              <dt className="eyebrow">{details.phone.label}</dt>
              <dd className="mt-2 text-base">
                {details.phone.numbers.map((number, i) => (
                  <span key={number}>
                    {i > 0 ? <span className="text-muted-foreground"> / </span> : null}
                    {/* Italian landline: the leading 0 is kept after the +39 code */}
                    <a
                      href={`tel:+39${number.replace(/\s/g, "")}`}
                      className="link-underline text-accent"
                    >
                      {number}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
            <div className="border-t border-hairline py-5">
              <dt className="eyebrow">{details.email.label}</dt>
              <dd className="mt-2 text-base">
                <a href={mailto} className="link-underline text-accent">
                  {c.firm.email}
                </a>
              </dd>
            </div>
            <div className="border-t border-hairline py-5">
              <dt className="eyebrow">{details.appointments.label}</dt>
              <dd className="mt-2 text-base">{details.appointments.value}</dd>
            </div>
          </dl>

          <a
            href={mailto}
            className="group mt-6 inline-flex h-14 items-center gap-3 rounded-sm bg-primary px-7 text-sm text-primary-foreground transition-colors hover:bg-accent"
          >
            {details.ctaLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          <nav aria-label={c.ui.relatedPages} className="mt-10">
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

        {/* Google Maps embed (no API key needed). It shows the Altamura location
            only, so it is labelled as such; the other locations link out above. */}
        <div>
          <h3 className="eyebrow">{map.label}</h3>
          <iframe
            title={map.label}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              details.locations[0].mapQuery,
            )}&z=16&output=embed`}
            className="mt-3 aspect-[16/11] w-full rounded-sm border border-hairline lg:aspect-[4/5]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={mapsUrl(details.locations[0].mapQuery)}
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
