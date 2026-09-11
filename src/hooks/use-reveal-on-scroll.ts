import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Reveal a group of items in sequence the first time it scrolls into view.
 *
 * - "idle"   before mount (server render, first paint): everything is VISIBLE,
 *            so the content never depends on JavaScript to be readable.
 * - "hidden" after mount, until the group reaches the viewport. These sections
 *            sit below the fold, so the switch happens off-screen.
 * - "shown"  once in view: items animate in one after another.
 *
 * Visitors who prefer reduced motion get "shown" straight away.
 */
export type RevealState = "idle" | "hidden" | "shown";

export function useRevealOnScroll<T extends Element>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, state] as const;
}

/**
 * Class and style for the item at `index` of a revealed group.
 * `from` sets the direction: "below" rises into place, "above" drops in like a
 * roller blind.
 */
export function revealItem(
  state: RevealState,
  index: number,
  { stagger = 450, from = "below" }: { stagger?: number; from?: "below" | "above" } = {},
): { className: string; style?: CSSProperties } {
  if (state === "idle") return { className: "" };
  if (state === "hidden") {
    return { className: `opacity-0 ${from === "above" ? "-translate-y-3" : "translate-y-4"}` };
  }
  return {
    className: "translate-y-0 opacity-100 transition-all duration-700 ease-out",
    style: { transitionDelay: `${index * stagger}ms` },
  };
}
