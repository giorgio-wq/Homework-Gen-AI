type Area = { id: string; title: string };

/**
 * Concise practice-area row for the Home page: title only. The full
 * summaries and descriptions live on the Services page and are not repeated here.
 */
export function ServicePreview({ area }: { area: Area }) {
  return (
    <article className="border-t border-hairline py-5 md:py-6">
      <h3 className="text-2xl leading-tight md:text-3xl">{area.title}</h3>
    </article>
  );
}
