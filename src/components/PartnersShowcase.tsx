import { useEffect, useRef, useState } from "react";

type Partner = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image: string;
  profile: readonly string[];
};

/**
 * About-page partners section.
 *
 * On a capable desktop it plays a scroll-driven "scrollytelling" sequence:
 *   1. both portraits sit side by side (intro + a "scroll" hint);
 *   2. the first partner's photo slides to the left while their text appears;
 *   3. a fluid transition brings in the second partner (photo on the right).
 *
 * On mobile — and whenever the visitor prefers reduced motion — it falls back to
 * a simple, robust stacked layout where the bios reveal as they scroll in.
 * `enhanced` starts false so the server render and first client render match
 * (the stacked version); the effect upgrades to the cinematic version after mount.
 */
export function PartnersShowcase({ partners }: { partners: readonly Partner[] }) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setEnhanced(desktop && !reduce);
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  if (enhanced && partners.length >= 2) {
    return <CinematicPartners partners={partners} />;
  }
  return <StackedPartners partners={partners} />;
}

function Portrait({
  image,
  initials,
  name,
  className = "",
}: {
  image: string;
  initials: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      role={image ? undefined : "img"}
      aria-label={image ? undefined : `Portrait placeholder for ${name}`}
      className={`relative flex items-center justify-center overflow-hidden rounded-sm bg-secondary ${className}`}
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
          <span className="relative font-display text-6xl text-muted-foreground md:text-7xl">
            {initials}
          </span>
        </>
      )}
    </div>
  );
}

function TextBlock({ partner }: { partner: Partner }) {
  return (
    <div>
      <h3 className="font-display text-4xl md:text-5xl">{partner.name}</h3>
      <p className="eyebrow mt-3">{partner.role}</p>
      <p className="mt-6 text-base leading-relaxed">{partner.bio}</p>
      <div className="mt-5 space-y-4">
        {partner.profile.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function CinematicPartners({ partners }: { partners: readonly Partner[] }) {
  const [a, b] = partners;
  const wrapRef = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const cap1 = useRef<HTMLDivElement>(null);
  const cap2 = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!a || !b) return;

    const clamp = (v: number, mn: number, mx: number) => Math.min(mx, Math.max(mn, v));
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
    const seg = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
    const set = (el: HTMLElement | null, x: number, opacity: number, scale = 1) => {
      if (!el) return;
      el.style.transform = `translate3d(${x}vw, 0, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
    };

    let raf = 0;
    const frame = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      const introFade = 1 - seg(p, 0.08, 0.22);

      // Partner 1 photo: intro (centre-left) -> left focus -> off left
      const moveB = seg(p, 0.14, 0.44);
      const leave1 = seg(p, 0.52, 0.7);
      let x1 = lerp(-16, -27, moveB);
      x1 = lerp(x1, -80, leave1);
      set(p1.current, x1, 1 - leave1, lerp(0.82, 1, moveB));

      // Partner 1 text (right side)
      const in1 = seg(p, 0.3, 0.48);
      const out1 = seg(p, 0.54, 0.68);
      let sl1 = lerp(4, 0, in1);
      sl1 = lerp(sl1, -4, out1);
      set(t1.current, 23 + sl1, in1 * (1 - out1));

      // Partner 2 photo: intro (centre-right) -> off right -> back in on the right
      if (p < 0.5) {
        const l2 = seg(p, 0.14, 0.3);
        set(p2.current, lerp(16, 44, l2), 1 - l2, 0.82);
      } else {
        const e2 = seg(p, 0.6, 0.86);
        set(p2.current, lerp(80, 27, e2), e2, lerp(0.82, 1, e2));
      }

      // Partner 2 text (left side)
      const in2 = seg(p, 0.7, 0.9);
      set(t2.current, -23 + lerp(-4, 0, in2), in2);

      // Intro captions + scroll hint
      set(cap1.current, -16, introFade);
      set(cap2.current, 16, introFade);
      if (hint.current) hint.current.style.opacity = String(introFade);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!a || !b) return null;

  return (
    <div ref={wrapRef} className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-hairline">
        {/* Partner 1 photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={p1}
            className="will-change-transform"
            style={{ transform: "translate3d(-16vw, 0, 0) scale(0.82)" }}
          >
            <Portrait
              image={a.image}
              initials={a.initials}
              name={a.name}
              className="h-[56vh] aspect-[4/5]"
            />
          </div>
        </div>

        {/* Partner 2 photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={p2}
            className="will-change-transform"
            style={{ transform: "translate3d(16vw, 0, 0) scale(0.82)" }}
          >
            <Portrait
              image={b.image}
              initials={b.initials}
              name={b.name}
              className="h-[56vh] aspect-[4/5]"
            />
          </div>
        </div>

        {/* Partner 1 text (right) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={t1}
            className="w-[38vw] max-w-md will-change-transform"
            style={{ transform: "translate3d(23vw, 0, 0)", opacity: 0 }}
          >
            <TextBlock partner={a} />
          </div>
        </div>

        {/* Partner 2 text (left) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={t2}
            className="w-[38vw] max-w-md will-change-transform"
            style={{ transform: "translate3d(-23vw, 0, 0)", opacity: 0 }}
          >
            <TextBlock partner={b} />
          </div>
        </div>

        {/* Intro caption 1 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] flex justify-center">
          <div
            ref={cap1}
            className="text-center will-change-transform"
            style={{ transform: "translate3d(-16vw, 0, 0)" }}
          >
            <p className="font-display text-2xl">{a.name}</p>
            <p className="eyebrow mt-1">{a.role}</p>
          </div>
        </div>

        {/* Intro caption 2 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] flex justify-center">
          <div
            ref={cap2}
            className="text-center will-change-transform"
            style={{ transform: "translate3d(16vw, 0, 0)" }}
          >
            <p className="font-display text-2xl">{b.name}</p>
            <p className="eyebrow mt-1">{b.role}</p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hint}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="eyebrow">Scroll to meet the partners</span>
          <span aria-hidden="true" className="animate-bounce text-lg">
            ↓
          </span>
        </div>
      </div>
    </div>
  );
}

function StackedPartners({ partners }: { partners: readonly Partner[] }) {
  return (
    <>
      {partners.map((partner) => (
        <section
          key={partner.id}
          aria-labelledby={`${partner.id}-name`}
          className="border-t border-hairline"
        >
          <div className="container-editorial grid gap-8 py-14 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-14 md:py-20">
            <div>
              <Portrait
                image={partner.image}
                initials={partner.initials}
                name={partner.name}
                className="aspect-[4/5] w-full"
              />
              <h3 id={`${partner.id}-name`} className="mt-5 text-2xl md:text-3xl">
                {partner.name}
              </h3>
              <p className="eyebrow mt-2">{partner.role}</p>
            </div>
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed md:text-xl">{partner.bio}</p>
              <div className="mt-6 space-y-4 border-t border-hairline pt-6">
                {partner.profile.map((paragraph, i) => (
                  <p
                    key={i}
                    className="reveal-on-scroll text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
