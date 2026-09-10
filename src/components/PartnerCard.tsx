type Partner = { id: string; name: string; role: string; initials: string; image: string };

/**
 * Home-page professional card: portrait, name and role only — biographies are
 * shown on the About page and are not duplicated here.
 *
 * Portrait placeholder — no stock or generated portraits. Set `image` on the
 * partner (in src/content/site.ts) to a file in public/ once photos exist.
 */
function Portrait({ image, initials, name }: { image: string; initials: string; name: string }) {
  return (
    <div
      role={image ? undefined : "img"}
      aria-label={image ? undefined : `Portrait placeholder for ${name}`}
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-secondary"
    >
      {image ? (
        <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
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
