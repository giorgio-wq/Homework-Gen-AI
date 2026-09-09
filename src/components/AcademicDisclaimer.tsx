import { c } from "@/content/site";

export function AcademicDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`max-w-2xl text-xs leading-relaxed text-muted-foreground ${className}`}>
      {c.firm.disclaimer}
    </p>
  );
}
