import { useRef, useState, type FormEvent } from "react";
import { useContent, useLocale } from "@/i18n/locale";
import { sendContactMessage } from "@/lib/send-contact-message";

type Errors = Partial<Record<"name" | "email" | "subject" | "message" | "privacy", string>>;

/** idle → sending → sent (message delivered) or error (delivery refused). */
type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "mt-2 h-12 w-full rounded-sm border border-input bg-card px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function ContactForm() {
  const c = useContent();
  const { locale } = useLocale();
  const f = c.contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");
    const privacy = data.get("privacy");

    if (!name) next.name = f.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = f.errors.email;
    if (!subject) next.subject = f.errors.subject;
    if (message.length < 10) next.message = f.errors.message;
    if (!privacy) next.privacy = f.errors.privacy;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const result = await sendContactMessage({
        data: { name, email, phone, subject, message, locale, company },
      });
      if (result.ok) {
        formRef.current?.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className="rounded-sm border border-hairline bg-card p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl">{f.heading}</h2>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{f.notice}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {/* Colour the "*" in the note to match the marks on the fields. */}
        {f.requiredNote.split("*").map((part, i) => (
          <span key={i}>
            {i > 0 ? <span className="font-semibold text-destructive">*</span> : null}
            {part}
          </span>
        ))}
      </p>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label={f.name.label} error={errors.name} required>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={f.name.placeholder}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass}
            />
          </Field>
          <Field id="email" label={f.email.label} error={errors.email} required>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={f.email.placeholder}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass}
            />
          </Field>
          <Field id="phone" label={f.phone.label}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={f.phone.placeholder}
              className={inputClass}
            />
          </Field>
          <Field id="subject" label={f.subject.label} error={errors.subject} required>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder={f.subject.placeholder}
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={inputClass}
            />
          </Field>
        </div>

        <Field id="message" label={f.message.label} error={errors.message} required>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={f.message.placeholder}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="mt-2 w-full rounded-sm border border-input bg-card p-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent"
          />
        </Field>

        {/* Honeypot: hidden from people, tempting to bots. A filled value makes
            the server drop the submission silently. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="privacy" className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              aria-required="true"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
            />
            <span className="text-muted-foreground">
              {f.privacy}
              <RequiredMark />
            </span>
          </label>
          {errors.privacy ? (
            <p id="privacy-error" className="mt-2 text-sm text-destructive">
              {errors.privacy}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-14 w-full items-center justify-center rounded-sm bg-primary px-7 text-sm text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start"
        >
          {sending ? f.sending : f.submit}
        </button>

        <div aria-live="polite">
          {status === "sent" ? (
            <div className="rounded-sm border-l-2 border-accent bg-secondary p-5">
              <p className="text-sm font-medium">{f.successTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.successBody}</p>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="rounded-sm border-l-2 border-destructive bg-secondary p-5">
              <p className="text-sm font-medium text-destructive">{f.errorTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.errorBody}</p>
              <a
                href={`mailto:${c.firm.email}`}
                className="link-underline mt-3 inline-block text-sm text-accent"
              >
                {f.errorMailLabel}
              </a>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

/**
 * Visual marker for required fields. Hidden from screen readers, which get
 * `aria-required` on the control itself instead of a bare "*".
 */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-1 font-semibold text-destructive">
      *
    </span>
  );
}

function Field({
  id,
  label,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
