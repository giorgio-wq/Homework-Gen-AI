/**
 * Server-side configuration values (API keys, mailbox addresses).
 *
 * On the deployed worker these come from `process.env`, which Cloudflare fills
 * from the project's secrets (`nodejs_compat` is on). Only secrets survive a
 * deploy: plain-text variables set in the dashboard are wiped by the next
 * build, so both `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are stored as secrets.
 * `setRuntimeEnv` covers runtimes that pass the bindings to the worker's
 * `fetch` instead. Locally, `RESEND_API_KEY=... npm run dev` is enough.
 */
let runtimeEnv: Record<string, unknown> = {};

export function setRuntimeEnv(env: unknown): void {
  if (env && typeof env === "object") {
    runtimeEnv = env as Record<string, unknown>;
  }
}

export function readEnv(key: string): string | undefined {
  const fromRuntime = runtimeEnv[key];
  if (typeof fromRuntime === "string" && fromRuntime.trim()) return fromRuntime.trim();

  const fromProcess = globalThis.process?.env?.[key];
  if (typeof fromProcess === "string" && fromProcess.trim()) return fromProcess.trim();

  return undefined;
}
