import { useEffect } from "react";

/**
 * Site-wide smooth ("inertia") scrolling via Lenis.
 *
 * Runs only on the client, and is skipped for visitors who prefer reduced
 * motion. Uses a dynamic import so nothing scroll-related touches the server
 * render. The gentle `duration` keeps the page fluid without feeling sluggish.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}
