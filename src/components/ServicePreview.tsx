type Area = { id: string; number: string; title: string; summary: string };

export function ServicePreview({ area }: { area: Area }) {
  return (
    <article className="group grid gap-3 border-t border-hairline py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8 md:py-10">
      <span className="font-display text-sm text-accent md:text-base">{area.number}</span>
      <div className="min-w-0">
        <h3 className="text-2xl md:text-3xl">{area.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {area.summary}
        </p>
      </div>
    </article>
  );
}
