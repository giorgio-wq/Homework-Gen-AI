import { useContent } from "@/i18n/locale";

export function AcademicDisclaimer({ className = "" }: { className?: string }) {
  const c = useContent();
  return (
    <p className={`max-w-2xl text-xs leading-relaxed text-muted-foreground ${className}`}>
      {c.firm.disclaimer}
    </p>
  );
}
