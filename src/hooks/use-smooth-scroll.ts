import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

type LenisLike = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (
    target: number | HTMLElement,
    options?: { immediate?: boolean; force?: boolean; offset?: number },
  ) => void;
};

// The running Lenis instance, shared so other code can move the page through it.
let lenis: LenisLike | null = null;

/**
 * Move the page instantly to `target` (a y position or an element).
 *
 * Goes through Lenis when it is running: Lenis keeps its own scroll target, so a
 * plain window.scrollTo would be pulled back to wherever Lenis thought the page
 * was — which is how an internal link could land halfway down the next page.
 */
export function jumpTo(target: number | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true, offset });
    return;
  }
  const y =
    typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, y + offset);
}

/**
 * Site-wide smooth ("inertia") scrolling via Lenis.
 *
 * Runs only on the client, and is skipped for visitors who prefer reduced
 * motion. Uses a dynamic import so nothing scroll-related touches the server
 * render. The gentle `duration` keeps the page fluid without feeling sluggish.
 *
 * It also settles the scroll position after every page change: a link opens the
 * new page at the top (or at its #anchor), while browser back/forward keeps the
 * position the router restores.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true }) as unknown as LenisLike;
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
      lenis = null;
    };
  }, []);

  // Back/forward navigations arrive through popstate; links do not.
  const popped = useRef(false);
  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const href = useRouterState({ select: (s) => s.location.href });
  const lastHref = useRef(href);
  useEffect(() => {
    if (href === lastHref.current) return; // first render: leave the browser's position alone
    lastHref.current = href;
    const wasPop = popped.current;
    popped.current = false;

    // Wait two frames so the new page has rendered (and any component that
    // switches layout after mounting has done so) before measuring positions.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const anchor = window.location.hash.slice(1);
        const el = anchor ? document.getElementById(anchor) : null;
        if (el) jumpTo(el);
        else if (wasPop) jumpTo(window.scrollY);
        else jumpTo(0);
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [href]);
}
