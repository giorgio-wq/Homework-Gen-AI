import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { revealItem, useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

type Area = { id: string; title: string; summary: string; detail: string };

/**
 * Practice areas as an expanding list: every area shows its name and a one-line
 * summary, and opening one reveals the full description. One at a time — opening
 * an area closes the previous one, so the page stays short.
 *
 * The whole header row is clickable, but the markup stays a proper heading +
 * button (the accordion pattern): the button's ::after overlay stretches across
 * the row, so the click target covers the summary without wrapping non-phrasing
 * content inside the button. The panel keeps its text in the page even when
 * closed, so it is still indexed and searchable.
 */
export function PracticeAreaList({ areas }: { areas: readonly Area[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [listRef, revealState] = useRevealOnScroll<HTMLUListElement>();
  const baseId = useId();

  return (
    <ul ref={listRef} className="border-t border-hairline">
      {areas.map((area, i) => {
        const isOpen = openId === area.id;
        const reveal = revealItem(revealState, i, { stagger: 220, from: "above" });
        const panelId = `${baseId}-${area.id}`;
        const headingId = `${panelId}-heading`;
        return (
          <li
            key={area.id}
            id={area.id}
            className={`border-b border-hairline ${reveal.className}`}
            style={reveal.style}
          >
            <div className="group relative py-7 pr-16 md:py-9 md:pr-20">
              <h2>
                <button
                  id={headingId}
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : area.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`text-left text-2xl leading-tight transition-colors after:absolute after:inset-0 after:z-10 md:text-3xl ${
                    isOpen ? "text-accent" : "group-hover:text-accent"
                  }`}
                >
                  {area.title}
                </button>
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                {area.summary}
              </p>
              <span
                aria-hidden="true"
                className={`absolute right-0 top-7 grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 md:top-9 ${
                  isOpen
                    ? "rotate-45 border-accent text-accent"
                    : "border-hairline text-foreground group-hover:border-accent group-hover:text-accent"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </div>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              aria-hidden={!isOpen}
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-9 pr-16 text-base leading-relaxed md:pb-11 md:pr-20 md:text-lg">
                  {area.detail}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
