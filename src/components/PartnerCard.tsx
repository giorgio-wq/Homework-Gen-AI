import { useContent } from "@/i18n/locale";

type Partner = { id: string; name: string; role: string; initials: string; image: string };

/**
 * Home-page professional card: portrait, name and role only — biographies are
 * shown on the About page and are not duplicated here. The fallback keeps the
 * card usable if an image is temporarily unavailable.
 */
function Portrait({ image, initials, name }: { image: string; initials: string; name: string }) {
  const c = useContent();
  return (
    <div
      role={image ? undefined : "img"}
      aria-label={image ? undefined : `${c.ui.portraitPlaceholder} ${name}`}
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-secondary"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          width={900}
          height={1125}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--hairline) 0 1px, transparent 1px 14px)",
            }}
          />
          <span className="relative font-display text-5xl text-muted-foreground md:text-6xl">
            {initials}
          </span>
        </>
      )}
    </div>
  );
}

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article>
      <Portrait image={partner.image} initials={partner.initials} name={partner.name} />
      <div className="mt-5">
        <h3 className="text-xl md:text-2xl">{partner.name}</h3>
        <p className="eyebrow mt-2">{partner.role}</p>
      </div>
    </article>
  );
}
