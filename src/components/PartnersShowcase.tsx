import { useEffect, useRef, useState } from "react";
import { useContent } from "@/i18n/locale";

type Partner = {
  id: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  profile: readonly string[];
};

/**
 * About-page partners section.
 *
 * On a capable desktop it plays a scroll-driven sequence that works for any
 * number of partners: all portraits sit side by side (intro), then each partner
 * in turn takes the stage — photo on one side, biography on the other, with the
 * sides alternating. Each state is *held* for part of the scroll so it settles
 * and can be read, instead of morphing continuously.
 *
 * On mobile — and whenever the visitor prefers reduced motion — it falls back to
 * a simple stacked layout where the bios reveal as they scroll in.
 * `enhanced` starts false so the server render and first client render match
 * (the stacked version); the effect upgrades to the cinematic one after mount.
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
      <div className="mt-6 space-y-4">
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
  const c = useContent();
  const n = partners.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const capRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  // Intro formation: portraits evenly spaced and scaled down to fit.
  const introGap = n >= 3 ? 26 : 32;
  const introScale = n >= 3 ? 0.62 : 0.82;
  const introX = (i: number) => (i - (n - 1) / 2) * introGap;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const clamp = (v: number, mn: number, mx: number) => Math.min(mx, Math.max(mn, v));
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
    // Eased 0→1 ramp. Without this every move runs at a constant rate, which
    // makes the long entrances read as a sprint next to the first partner's
    // short shift; easing in and out evens out how fast they *feel*.
    const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const seg = (p: number, s: number, e: number) => easeInOut(clamp((p - s) / (e - s), 0, 1));
    // Linear variant, for fades where easing is not wanted.
    const segLinear = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
    const set = (el: HTMLElement | null, x: number, opacity: number, scale = 1) => {
      if (!el) return;
      el.style.transform = `translate3d(${x}vw, 0, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
    };

    /* Timeline: an intro hold, then one slot per partner. Each slot is part
       transition, part HOLD — so every partner settles into a stable, centred
       composition instead of the whole thing morphing continuously. */
    const INTRO = 0.1;
    // Share of a slot spent moving; the rest is the hold. Keeping this low
    // leaves a long settled stretch on each partner, so their text can be read
    // without the composition drifting — in either scroll direction.
    const TRANS = 0.36;
    const slot = (1 - INTRO) / n;

    let raf = 0;
    const frame = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Skip style writes while the section is off-screen, so this page scrolls
      // with the same smoothness as the rest of the site.
      if (rect.bottom < -vh || rect.top > vh * 2) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const total = wrap.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      const introFade = 1 - seg(p, INTRO, INTRO + slot * TRANS * 0.5);

      for (let i = 0; i < n; i++) {
        const aStart = INTRO + i * slot;
        const aTransEnd = aStart + slot * TRANS;
        const aEnd = aStart + slot;
        const flip = i % 2 === 1; // alternate: photo left, then right, then left…
        const focusX = flip ? 27 : -27;
        // Just off the edge rather than far outside it: a shorter run-in keeps
        // the entrances at a similar apparent speed to the first partner's
        // short shift out of the intro formation.
        const offX = flip ? 58 : -58;
        const textX = flip ? -23 : 23;
        const iX = introX(i);

        let x: number;
        let opacity: number;
        let scale: number;

        if (i === 0) {
          // First partner grows out of the intro formation into focus.
          const mv = seg(p, aStart, aTransEnd);
          x = lerp(iX, focusX, mv);
          scale = lerp(introScale, 1, mv);
          opacity = 1;
        } else if (p < aStart - slot * 0.25) {
          // Still leaving the intro formation (invisible well before its slot).
          const ex = seg(p, INTRO, INTRO + slot * TRANS * 0.6);
          x = iX + ex * (iX >= 0 ? 30 : -30);
          opacity = 1 - ex;
          scale = introScale;
        } else {
          // Enters from off-screen for its own slot.
          const en = seg(p, aStart, aTransEnd);
          x = lerp(offX, focusX, en);
          opacity = en;
          scale = lerp(introScale, 1, en);
        }

        // Every partner but the last leaves as the next one arrives.
        if (i < n - 1) {
          const lv = seg(p, aEnd, aEnd + slot * TRANS * 0.7);
          x = lerp(x, offX, lv);
          opacity *= 1 - lv;
        }
        set(photoRefs.current[i] ?? null, x, opacity, scale);

        // Biography: in near the end of the transition, static through the hold.
        const tIn = segLinear(p, aStart + slot * TRANS * 0.45, aTransEnd);
        const tOut = i < n - 1 ? segLinear(p, aEnd, aEnd + slot * TRANS * 0.6) : 0;
        const slide = lerp(flip ? -4 : 4, 0, tIn);
        set(textRefs.current[i] ?? null, textX + slide, tIn * (1 - tOut));

        // Intro captions
        set(capRefs.current[i] ?? null, iX, introFade);
      }

      if (hintRef.current) hintRef.current.style.opacity = String(introFade);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [n, introGap, introScale]);

  if (n < 2) return null;

  /* Scroll distance allotted to each partner (in viewport heights). Because the
     sequence is scrubbed by scroll, this is the pacing dial: a larger value
     spreads the same movement over more scrolling, i.e. slower animation. */
  const VH_PER_PARTNER = 320;
  const stageHeight = `${100 + n * VH_PER_PARTNER}vh`;

  /* Lift the portraits and their captions off the bottom of the stage so the
     "scroll" hint keeps clear air beneath them. STAGE_LIFT is applied as bottom
     padding on the centring wrappers (shifting content up by half of it); the
     captions then sit just under the portraits, wherever those end up. */
  const STAGE_LIFT = 16; // vh of bottom padding
  const photoBottomVh = 50 - STAGE_LIFT / 2 + (56 * introScale) / 2;
  const captionBottomVh = Math.max(100 - (photoBottomVh + 7), 20);

  return (
    <div ref={wrapRef} className="relative" style={{ height: stageHeight }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-hairline">
        {partners.map((partner, i) => (
          <div
            key={`photo-${partner.id}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingBottom: `${STAGE_LIFT}vh` }}
          >
            <div
              ref={(el) => {
                photoRefs.current[i] = el;
              }}
              className="will-change-transform"
              style={{ transform: `translate3d(${introX(i)}vw, 0, 0) scale(${introScale})` }}
            >
              <Portrait
                image={partner.image}
                initials={partner.initials}
                name={partner.name}
                className="h-[56vh] aspect-[4/5]"
              />
            </div>
          </div>
        ))}

        {partners.map((partner, i) => (
          <div
            key={`text-${partner.id}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingBottom: `${STAGE_LIFT}vh` }}
          >
            <div
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="w-[38vw] max-w-md will-change-transform"
              style={{
                transform: `translate3d(${i % 2 === 1 ? -23 : 23}vw, 0, 0)`,
                opacity: 0,
              }}
            >
              <TextBlock partner={partner} />
            </div>
          </div>
        ))}

        {partners.map((partner, i) => (
          <div
            key={`cap-${partner.id}`}
            className="pointer-events-none absolute inset-x-0 flex justify-center"
            style={{ bottom: `${captionBottomVh}vh` }}
          >
            <div
              ref={(el) => {
                capRefs.current[i] = el;
              }}
              className="text-center will-change-transform"
              style={{ transform: `translate3d(${introX(i)}vw, 0, 0)` }}
            >
              <p className={`font-display ${n >= 3 ? "text-lg" : "text-2xl"}`}>{partner.name}</p>
              <p className="eyebrow mt-1">{partner.role}</p>
            </div>
          </div>
        ))}

        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="eyebrow">{c.about.team.scrollHint}</span>
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
              <div className="space-y-4">
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
