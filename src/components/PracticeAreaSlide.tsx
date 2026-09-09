import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { c } from "@/content/site";

type Area = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
};

/**
 * Full-screen practice-area "slide" for the Services page.
 *
 * Each area fills (almost) the whole viewport; the layout alternates left/right
 * as you scroll, over a background layer. Until real photography is available,
 * `area.image` stays "" and a themed gradient placeholder is shown. Drop a photo
 * in public/ and set `image` in src/content/site.ts to swap it in — the dark
 * overlay keeps the text legible over any picture.
 */

// Themed placeholder backgrounds (deep navy + burgundy family), one per slide,
// used only while `area.image` is empty.
const placeholderBackgrounds = [
  "linear-gradient(135deg, oklch(0.20 0.03 264) 0%, oklch(0.30 0.08 22) 100%)",
  "linear-gradient(135deg, oklch(0.24 0.04 170) 0%, oklch(0.20 0.03 264) 100%)",
  "linear-gradient(135deg, oklch(0.20 0.03 264) 0%, oklch(0.30 0.06 50) 100%)",
  "linear-gradient(135deg, oklch(0.22 0.05 290) 0%, oklch(0.29 0.09 16) 100%)",
];

export function PracticeAreaSlide({ area, index }: { area: Area; index: number }) {
  const flip = index % 2 === 1;
  const { cta } = c.services;

  return (
    <section
      id={area.id}
      aria-labelledby={`${area.id}-heading`}
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-primary py-24 text-primary-foreground md:min-h-screen"
    >
      {/* Background: real photo when set, otherwise a themed gradient placeholder.
          `md:bg-fixed` gives a subtle parallax as the content scrolls over it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: area.image
            ? `url(${area.image})`
            : placeholderBackgrounds[index % placeholderBackgrounds.length],
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
        <div className={`max-w-xl ${flip ? "ml-auto text-right" : ""}`}>
          <span className="font-display text-6xl text-accent md:text-7xl">{area.number}</span>
          <h2
            id={`${area.id}-heading`}
            className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl"
          >
            {area.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90">{area.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{area.detail}</p>
          <Link
            to={cta.to}
            className={`group mt-8 inline-flex items-center gap-3 text-sm text-primary-foreground ${
              flip ? "flex-row-reverse" : ""
            }`}
          >
            <span className="link-underline">{cta.label}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
