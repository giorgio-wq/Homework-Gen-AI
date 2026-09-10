import { Link } from "@tanstack/react-router";
import { useContent } from "@/i18n/locale";
import { Wordmark } from "@/components/Wordmark";
import { AcademicDisclaimer } from "@/components/AcademicDisclaimer";

export function Footer() {
  const c = useContent();
  const mapsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <footer className="mt-24 border-t border-hairline bg-secondary/60">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{c.footer.tagline}</p>
          <img
            src="/brand/studio-legale-caso-logo.webp"
            alt="Studio Legale Caso – Associazione Professionale"
            width={955}
            height={667}
            className="mt-6 h-auto w-40"
          />
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">{c.footer.navHeading}</h2>
          <ul className="mt-4 space-y-2">
            {c.nav.items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{c.footer.contactHeading}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {c.contact.details.locations.map((location) => (
              <li key={location.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span>{location.name}</span>
                <a
                  href={mapsUrl(location.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-xs text-accent"
                >
                  {c.contact.details.directionsLabel}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={`mailto:${c.firm.email}`} className="link-underline text-accent">
                {c.firm.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-editorial flex flex-col gap-4 border-t border-hairline py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {c.firm.name}. {c.footer.rights}
        </p>
        <AcademicDisclaimer />
      </div>
    </footer>
  );
}
