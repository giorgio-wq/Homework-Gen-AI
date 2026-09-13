import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { getContent } from "@/content/site";
import { isValidPhone } from "@/lib/phone";
import { readEnv } from "@/lib/server-env";

/**
 * Contact form delivery.
 *
 * The browser only posts the message here; the mailbox address and the Resend
 * API key never leave the server. Everything is validated again on this side —
 * client-side validation is a convenience, not a guarantee.
 */
const payloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).refine(isValidPhone),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(5000),
  // The client sends the active language. Unknown or missing values use the
  // canonical Italian fallback rather than reaching the email template.
  locale: z.enum(["it", "en"]).catch("it"),
  // Honeypot: a field hidden from people but often filled in by bots.
  // Keep a submitted value intact so the check below can actually detect it.
  company: z.string().max(200).default(""),
});

export type ContactPayload = z.input<typeof payloadSchema>;
export type ContactResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };

const DEFAULT_FROM = "Studio Legale Caso <onboarding@resend.dev>";

/** Max submissions accepted from one address inside the window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string | undefined): boolean {
  if (!ip) return false;
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactPayload) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    const parsed = payloadSchema.safeParse(data);
    if (!parsed.success) return { ok: false, reason: "invalid" };

    const form = parsed.data;

    // A filled honeypot is a bot: answer as if all went well and drop it.
    if (form.company) return { ok: true };

    if (isRateLimited(getRequestIP({ xForwardedFor: true }))) {
      return { ok: false, reason: "failed" };
    }

    const apiKey = readEnv("RESEND_API_KEY");
    const to = readEnv("CONTACT_TO_EMAIL");
    if (!apiKey || !to) {
      console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
      return { ok: false, reason: "failed" };
    }

    const emailCopy = getContent(form.locale).contact.form;
    const labels = emailCopy.emailLabels;
    const body = [
      `${labels.name}: ${form.name}`,
      `${labels.email}: ${form.email}`,
      `${labels.phone}: ${form.phone || "—"}`,
      `${labels.subject}: ${form.subject}`,
      `${labels.siteLanguage}: ${form.locale}`,
      "",
      form.message,
    ].join("\n");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: readEnv("CONTACT_FROM_EMAIL") ?? DEFAULT_FROM,
          to: [to],
          reply_to: form.email,
          subject: `[${emailCopy.emailSubjectPrefix}] ${form.subject}`,
          text: body,
        }),
      });

      if (!response.ok) {
        console.error(`Contact form: Resend replied ${response.status} ${await response.text()}`);
        return { ok: false, reason: "failed" };
      }
    } catch (error) {
      console.error("Contact form: could not reach Resend.", error);
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  });
