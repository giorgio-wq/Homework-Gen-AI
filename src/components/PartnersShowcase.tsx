import { useEffect, useRef, useState } from "react";
import { useContent } from "@/i18n/locale";
import { jumpTo } from "@/hooks/use-smooth-scroll";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { PARTNERS_ANCHOR } from "@/lib/anchors";

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
 * a simple stacked layout where each biography reveals from an alternating side.
 * `enhanced` starts false so the server render and first client render match
 * (the stacked version); the effect upgrades to the cinematic one after mount.
 */
export function PartnersShowcase({
  partners,
  heading,
}: {
  partners: readonly Partner[];
  /** Section title, shown above the portraits in both layouts. */
  heading?: string | undefined;
}) {
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

  // Arriving via /about#team: the section swaps from the stacked layout to the
  // much taller cinematic one after mounting, which moves it on the page. Jump
  // to it again once the layout is settled, so the visitor lands on the intro
  // with all the portraits rather than part-way through the sequence.
  useEffect(() => {
    if (window.location.hash !== `#${PARTNERS_ANCHOR}`) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(PARTNERS_ANCHOR);
      if (el) jumpTo(el);
    });
    return () => cancelAnimationFrame(frame);
  }, [enhanced]);

  if (enhanced && partners.length >= 2) {
    return <CinematicPartners partners={partners} heading={heading} />;
  }
  return <StackedPartners partners={partners} heading={heading} />;
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
      <h3 className="font-display text-4xl leading-tight xl:text-5xl">{partner.name}</h3>
      <p className="eyebrow mt-3">{partner.role}</p>
      <div className="mt-6 space-y-4">
        {partner.profile.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground xl:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

// Focused partner: portrait size and the horizontal positions of the portrait
// and its biography (vw from the centre). The pair is balanced about the middle
// of the screen, with the biography on the side opposite the photo.
const FOCUS_SCALE = 1.1;
const FOCUS_PHOTO_X = 21;
const FOCUS_TEXT_X = 17;
// How far (vw) a portrait drifts while fading in or out between partners.
const SWAP_DRIFT = 10;

function CinematicPartners({
  partners,
  heading,
}: {
  partners: readonly Partner[];
  heading?: string | undefined;
}) {
  const c = useContent();
  const n = partners.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const capRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
        const focusX = flip ? FOCUS_PHOTO_X : -FOCUS_PHOTO_X;
        /* Every partner-to-partner change is a crossfade with a short outward
           drift, not a slide in from off-screen. Long slides made the later
           partners cover ~7x the distance of the first one in the same scroll,
           so the sequence felt as if it sped up. With the same small motion on
           every change, each step feels equally paced. Because the timeline is
           scrubbed by scroll position, the same applies scrolling back up. */
        const outward = flip ? 1 : -1;
        const driftX = focusX + outward * SWAP_DRIFT;
        const textX = flip ? -FOCUS_TEXT_X : FOCUS_TEXT_X;
        const iX = introX(i);

        let x: number;
        let opacity: number;
        let scale: number;

        if (i === 0) {
          // First partner grows out of the intro formation into focus.
          const mv = seg(p, aStart, aTransEnd);
          x = lerp(iX, focusX, mv);
          scale = lerp(introScale, FOCUS_SCALE, mv);
          opacity = 1;
        } else if (p < aStart - slot * 0.25) {
          // Still leaving the intro formation (invisible well before its slot).
          const ex = seg(p, INTRO, INTRO + slot * TRANS * 0.6);
          x = iX; // fades in place: no extra motion competing with the first partner
          opacity = 1 - ex;
          scale = introScale;
        } else {
          // Fades in at its own place, drifting in slightly from outside.
          const en = seg(p, aStart, aTransEnd);
          x = lerp(driftX, focusX, en);
          opacity = en;
          scale = lerp(FOCUS_SCALE * 0.9, FOCUS_SCALE, en);
        }

        // Every partner but the last fades out, drifting slightly outward, as
        // the next one arrives.
        if (i < n - 1) {
          const lv = seg(p, aEnd, aEnd + slot * TRANS * 0.7);
          x = lerp(x, driftX, lv);
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
      if (headingRef.current) headingRef.current.style.opacity = String(introFade);

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

  /* Vertical layout of the intro screen: section title at the top (below the
     sticky header), portraits and their captions under it, "scroll" hint at the
     bottom. STAGE_LIFT is bottom padding on the centring wrappers (it shifts
     the portraits up by half of it); a small lift leaves room for the title
     above. The captions then sit just under the portraits. */
  const STAGE_LIFT = 4; // vh of bottom padding
  const photoBottomVh = 50 - STAGE_LIFT / 2 + (56 * introScale) / 2;
  const captionBottomVh = Math.max(100 - (photoBottomVh + 7), 20);

  return (
    <div ref={wrapRef} id={PARTNERS_ANCHOR} className="relative" style={{ height: stageHeight }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {heading ? (
          // Sized in viewport height so it keeps the same share of the screen
          // whatever the window height, and never runs into the portraits.
          <div
            className="pointer-events-none absolute inset-x-0 flex justify-center px-8"
            style={{ top: "calc(5rem + 4vh)" }}
          >
            <h2
              ref={headingRef}
              className="max-w-4xl text-center text-[clamp(2rem,5.2vh,3.25rem)] leading-[1.1]"
            >
              {heading}
            </h2>
          </div>
        ) : null}

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
              className="w-[36vw] max-w-xl will-change-transform"
              style={{
                transform: `translate3d(${i % 2 === 1 ? -FOCUS_TEXT_X : FOCUS_TEXT_X}vw, 0, 0)`,
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

function MobilePartnerBiography({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) {
  const [bioRef, bioState] = useRevealOnScroll<HTMLDivElement>();
  const hiddenDirection = index % 2 === 0 ? "translate-x-6" : "-translate-x-6";
  let revealClass = "";

  if (bioState === "hidden") {
    revealClass = `opacity-0 ${hiddenDirection}`;
  } else if (bioState === "shown") {
    revealClass = "translate-x-0 opacity-100 transition-all duration-700 ease-out";
  }

  return (
    <div className="max-w-2xl overflow-hidden">
      <div ref={bioRef} className={`will-change-transform ${revealClass}`}>
        <div className="space-y-4">
          {partner.profile.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function StackedPartners({
  partners,
  heading,
}: {
  partners: readonly Partner[];
  heading?: string | undefined;
}) {
  return (
    <div id={PARTNERS_ANCHOR}>
      {heading ? (
        <div className="container-editorial pb-12 pt-16 md:pt-20">
          <h2 className="max-w-3xl text-[2rem] leading-[1.08] sm:text-5xl">{heading}</h2>
        </div>
      ) : null}
      {partners.map((partner, i) => (
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
            <MobilePartnerBiography partner={partner} index={i} />
          </div>
        </section>
      ))}
    </div>
  );
}
