import { useEffect, useRef } from "react";

type Area = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
};

/**
 * Full-screen practice-area "slide" for the Services page.
 *
 * The effect is scroll-linked (scrubbed), not a one-shot reveal: as each slide
 * travels through the viewport its content drifts vertically (parallax) and is
 * brightest when the slide is centred, fading towards the edges, while the
 * background gently zooms/pans with the scroll. The layout alternates left/right.
 *
 * Everything degrades gracefully: with reduced motion no scrubbing runs and the
 * content stays fully visible and static. Until real photography is available
 * `area.image` stays "" and a themed gradient placeholder is shown; the dark
 * overlay keeps text legible over any picture.
 */

// Themed placeholder backgrounds (deep-navy brand family), one per slide,
// used only while `area.image` is empty.
const placeholderBackgrounds = [
  "linear-gradient(135deg, #11152f 0%, #1b2148 100%)",
  "linear-gradient(135deg, #141a3a 0%, #0e1128 100%)",
  "linear-gradient(135deg, #11152f 0%, #232a55 100%)",
  "linear-gradient(135deg, #171d40 0%, #0f1229 100%)",
];

export function PracticeAreaSlide({ area, index }: { area: Area; index: number }) {
  const flip = index % 2 === 1;

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v: number, mn: number, mx: number) => Math.min(mx, Math.max(mn, v));
    let raf = 0;

    const frame = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Only write styles while the slide is near the viewport: idle slides
        // would otherwise cost a style recalculation every frame, which makes
        // scrolling feel heavier on this page than on the others.
        if (rect.bottom < -vh || rect.top > vh * 2) {
          raf = requestAnimationFrame(frame);
          return;
        }
        const center = rect.top + rect.height / 2;
        // q ≈ 1 while entering from the bottom, 0.5 when centred, ≈ 0 when leaving the top
        const q = center / vh;
        const dist = Math.abs(q - 0.5);

        if (contentRef.current) {
          const opacity = clamp((0.5 - dist) / 0.22, 0, 1);
          const ty = (0.5 - q) * 60; // vertical parallax drift
          contentRef.current.style.opacity = String(opacity);
          contentRef.current.style.transform = `translate3d(0, ${ty}px, 0)`;
        }
        if (bgRef.current) {
          const scale = 1.1 + clamp(1 - q, 0, 1) * 0.1;
          const bty = (q - 0.5) * 40; // background drifts the opposite way for depth
          bgRef.current.style.transform = `translate3d(0, ${bty}px, 0) scale(${scale})`;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={area.id}
      aria-labelledby={`${area.id}-heading`}
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-primary py-24 text-primary-foreground md:min-h-screen"
    >
      {/* Background: real photo or themed gradient placeholder; transform is driven
          by scroll for the zoom/pan. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: area.image
            ? `url(${area.image})`
            : placeholderBackgrounds[index % placeholderBackgrounds.length],
          transform: "scale(1.1)",
        }}
      />
      {/* Darkening overlay, heavier on the text side, for legibility over any image. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          flip
            ? "bg-gradient-to-l from-black/80 via-black/45 to-transparent"
            : "bg-gradient-to-r from-black/80 via-black/45 to-transparent"
        }`}
      />

      <div className="container-editorial">
        <div
          ref={contentRef}
          className={`max-w-xl will-change-transform ${flip ? "ml-auto text-right" : ""}`}
        >
          <h2
            id={`${area.id}-heading`}
            className="break-words font-display text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl"
          >
            {area.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90">{area.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{area.detail}</p>
        </div>
      </div>
    </section>
  );
}
