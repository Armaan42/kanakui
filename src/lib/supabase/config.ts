/**
 * Supabase connection details. Both values are public by design (they ship to
 * the browser); Row Level Security in supabase/migrations protects the data.
 * When they're missing (e.g. a deployment without the env vars), accounts are
 * simply off: the site works, and the sign-in page says sign-in isn't set up.
 */
export const supabaseConfig =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ? { url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }
    : null

export const accountsEnabled = supabaseConfig !== null

/**
 * Only same-site paths may be used as a post-sign-in destination, so a crafted
 * link can't bounce someone to another website ("open redirect").
 */
export function safeNextPath(value: string | null | undefined, fallback = "/account"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback
  return value
}
