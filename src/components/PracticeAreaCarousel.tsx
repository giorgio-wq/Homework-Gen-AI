import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Area = { id: string; title: string; summary: string };

type Labels = {
  label: string;
  previous: string;
  next: string;
  slide: string;
  of: string;
};

/** How long each area stays in focus before the carousel moves on. */
const INTERVAL_MS = 5000;

/** Minimum horizontal travel, in pixels, for a drag to count as a swipe. */
const SWIPE_PX = 50;

/**
 * Signed distance of slide `i` from the active one on a loop, so the carousel
 * wraps: with seven areas the offsets run -3…3 and the last area sits just to
 * the left of the first.
 */
function loopOffset(i: number, active: number, count: number): number {
  const d = (((i - active) % count) + count) % count;
  return d > count / 2 ? d - count : d;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Home page practice areas as a "coverflow" carousel: the active area sits in
 * the centre at full size, its two neighbours peek in at the sides smaller,
 * blurred and faded, and the whole row slides along every few seconds.
 *
 * The progress bar is the timer: its CSS animation lasts one interval and the
 * carousel advances when it ends, so pausing the animation (hover, keyboard
 * focus, section off screen) pauses the carousel with it and the two can never
 * drift apart. With reduced motion there is no autoplay; arrows, swipe and the
 * keyboard still work.
 */
export function PracticeAreaCarousel({
  areas,
  labels,
}: {
  areas: readonly Area[];
  labels: Labels;
}) {
  const count = areas.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  // Off until mounted: the server cannot know the motion preference, and a
  // progress bar rendered before we do would fire instantly under reduced motion.
  const [autoplay, setAutoplay] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => setActive(((index % count) + count) % count),
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const paused = hovered || keyboardFocus || !onScreen;

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    }
  }

  const current = areas[active];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={labels.label}
      onKeyDown={handleKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setKeyboardFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
    >
      {/* Stage: every slide shares one grid cell, so the stage is as tall as
          the tallest card and the transforms move them without reflow. */}
      <div
        className="relative grid touch-pan-y select-none overflow-hidden py-4"
        onPointerDown={(e) => {
          dragStartX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const start = dragStartX.current;
          dragStartX.current = null;
          if (start === null) return;
          const dx = e.clientX - start;
          if (Math.abs(dx) > SWIPE_PX) goTo(active + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {areas.map((area, i) => {
          const offset = loopOffset(i, active, count);
          const distance = Math.abs(offset);
          const isActive = distance === 0;
          return (
            <div
              key={area.id}
              role="group"
              aria-roledescription={labels.slide}
              aria-label={`${i + 1} ${labels.of} ${count}`}
              aria-hidden={!isActive}
              onClick={isActive ? undefined : () => goTo(i)}
              className={`col-start-1 row-start-1 mx-auto w-[82%] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[64%] lg:w-[52%] ${
                distance === 1 ? "cursor-pointer" : ""
              } ${distance > 1 ? "pointer-events-none" : ""}`}
              style={{
                transform: `translateX(${offset * 80}%) scale(${isActive ? 1 : 0.8})`,
                opacity: isActive ? 1 : distance === 1 ? 0.45 : 0,
                filter: isActive ? "none" : "blur(3px)",
                zIndex: 10 - distance,
              }}
            >
              <article className="flex h-full min-h-[16rem] flex-col rounded-sm border border-hairline bg-card p-8 md:min-h-[19rem] md:p-12">
                <span aria-hidden="true" className="block h-1 w-12 bg-accent" />
                <h3 className="mt-6 text-3xl leading-tight md:text-5xl">{area.title}</h3>
                <p className="mt-auto max-w-lg pt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {area.summary}
                </p>
              </article>
            </div>
          );
        })}
      </div>

      {/* Controls: previous · counter with progress bar · next */}
      <div className="mt-8 flex items-center justify-center gap-6 md:gap-8">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-hairline transition-colors hover:border-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{labels.previous}</span>
        </button>

        <div className="w-36 md:w-44">
          <p aria-hidden="true" className="text-center font-display text-lg tabular-nums text-ink">
            {pad(active + 1)} <span className="text-muted-foreground">/ {pad(count)}</span>
          </p>
          <div className="mt-2 h-0.5 w-full overflow-hidden bg-hairline">
            {autoplay ? (
              <div
                // A new key restarts the animation whenever the slide changes,
                // including by hand.
                key={active}
                className="carousel-progress h-full bg-accent"
                style={{
                  animationDuration: `${INTERVAL_MS}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
                onAnimationEnd={() => goTo(active + 1)}
              />
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-hairline transition-colors hover:border-foreground"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{labels.next}</span>
        </button>
      </div>

      {/* Announce changes only when the user is driving; an autoplaying
          carousel that talks every five seconds is unusable with a reader. */}
      <p className="sr-only" aria-live={autoplay && !paused ? "off" : "polite"} aria-atomic="true">
        {current ? `${labels.slide} ${active + 1} ${labels.of} ${count}: ${current.title}` : null}
      </p>
    </section>
  );
}
