type Partner = { id: string; name: string; role: string; bio: string; initials: string };

/**
 * Portrait placeholder — no stock or generated portraits.
 * Replace <PortraitPlaceholder /> with a real <img> once photos exist.
 */
function PortraitPlaceholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div
      role="img"
      aria-label={`Portrait placeholder for ${name}`}
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-secondary"
    >
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
    </div>
  );
}

export function PartnerCard({ partner, large = false }: { partner: Partner; large?: boolean }) {
  return (
    <article className={large ? "grid gap-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]" : ""}>
      <PortraitPlaceholder initials={partner.initials} name={partner.name} />
      <div className={large ? "min-w-0 self-center" : "mt-5"}>
        <h3 className={large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}>{partner.name}</h3>
        <p className="eyebrow mt-2">{partner.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{partner.bio}</p>
      </div>
    </article>
  );
}
