type Area = { id: string; number: string; title: string };

/**
 * Concise practice-area row for the Home page: number and name only. The full
 * summaries and descriptions live on the Services page and are not repeated here.
 */
export function ServicePreview({ area }: { area: Area }) {
  return (
    <article className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-hairline py-5 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8 md:py-6">
      <span className="font-display text-sm text-accent md:text-base">{area.number}</span>
      <h3 className="text-xl md:text-2xl">{area.title}</h3>
    </article>
  );
}
