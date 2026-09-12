/**
 * Server-side configuration values (API keys, mailbox addresses).
 *
 * On Cloudflare Workers secrets arrive as the `env` argument of the worker's
 * `fetch`, not on `process.env`, so `src/server.ts` hands them to us here on
 * every request. Locally there is no such argument and we fall back to the
 * Node environment, which is what `RESEND_API_KEY=... npm run dev` sets.
 */
let runtimeEnv: Record<string, unknown> = {};

export function setRuntimeEnv(env: unknown): void {
  if (env && typeof env === "object") {
    runtimeEnv = env as Record<string, unknown>;
  }
}

/** Temporary diagnostics: reports which names are visible, never their values. */
export function describeEnvSources(): Record<string, unknown> {
  return {
    runtimeKeys: Object.keys(runtimeEnv),
    processKeys: Object.keys(globalThis.process?.env ?? {}).filter(
      (k) => k.startsWith("RESEND") || k.startsWith("CONTACT"),
    ),
  };
}

export function readEnv(key: string): string | undefined {
  const fromRuntime = runtimeEnv[key];
  if (typeof fromRuntime === "string" && fromRuntime.trim()) return fromRuntime.trim();

  const fromProcess = globalThis.process?.env?.[key];
  if (typeof fromProcess === "string" && fromProcess.trim()) return fromProcess.trim();

  return undefined;
}
