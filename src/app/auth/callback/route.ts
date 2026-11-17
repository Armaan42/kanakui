import { NextResponse, type NextRequest } from "next/server"

import { safeNextPath } from "@/lib/supabase/config"
import { getServerSupabase } from "@/lib/supabase/server"

/**
 * Google sends people back here (via Supabase) with a one-time `code`.
 * Exchanging it sets the session cookies; then we continue to `next`, which
 * must be a path on this site.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const next = safeNextPath(searchParams.get("next"))

  const fail = (reason: string) => {
    const url = new URL("/sign-in", origin)
    url.searchParams.set("error", reason)
    if (next !== "/account") url.searchParams.set("next", next)
    return NextResponse.redirect(url)
  }

  // e.g. error=access_denied when someone closes Google's consent screen.
  if (searchParams.get("error")) return fail(searchParams.get("error") === "access_denied" ? "cancelled" : "provider")
  const code = searchParams.get("code")
  if (!code) return fail("missing_code")

  const supabase = await getServerSupabase()
  if (!supabase) return fail("not_configured")
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) return fail("exchange")

  return NextResponse.redirect(new URL(next, origin))
}
