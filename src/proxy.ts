import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

import { safeNextPath, supabaseConfig } from "@/lib/supabase/config"

const PROTECTED = ["/account"]
const AUTH_PAGES = ["/sign-in", "/sign-up"]

const matches = (path: string, list: string[]) => list.some((p) => path === p || path.startsWith(`${p}/`))

/**
 * Keeps the Supabase session fresh and guards /account.
 *
 * Visitors without a Supabase cookie (almost everyone) pass straight through,
 * so the site's prebuilt pages stay as fast as before. With a cookie, the
 * session is verified with getClaims() (it checks the token's signature; the
 * cookie alone isn't trusted) and refreshed when it's close to expiring.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isProtected = matches(pathname, PROTECTED)
  const isAuthPage = matches(pathname, AUTH_PAGES)

  const signIn = () => {
    const url = request.nextUrl.clone()
    url.pathname = "/sign-in"
    url.search = `?next=${encodeURIComponent(pathname + search)}`
    return url
  }

  if (!supabaseConfig) return isProtected ? NextResponse.redirect(signIn()) : NextResponse.next()

  const hasSessionCookie = request.cookies.getAll().some((c) => c.name.startsWith("sb-"))
  if (!hasSessionCookie) return isProtected ? NextResponse.redirect(signIn()) : NextResponse.next()

  let response = NextResponse.next({ request })
  const supabase = createServerClient(supabaseConfig.url, supabaseConfig.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet, headers) => {
        for (const { name, value } of toSet) request.cookies.set(name, value)
        response = NextResponse.next({ request })
        for (const { name, value, options } of toSet) response.cookies.set(name, value, options)
        for (const [key, value] of Object.entries(headers)) response.headers.set(key, value)
      },
    },
  })
  const { data } = await supabase.auth.getClaims()
  const signedIn = Boolean(data?.claims)

  // Redirects must carry any refreshed cookies along with them.
  const redirect = (url: URL) => {
    const res = NextResponse.redirect(url)
    for (const cookie of response.cookies.getAll()) res.cookies.set(cookie)
    return res
  }

  if (isProtected && !signedIn) return redirect(signIn())
  if (isAuthPage && signedIn) {
    const url = request.nextUrl.clone()
    url.pathname = safeNextPath(request.nextUrl.searchParams.get("next"))
    url.search = ""
    return redirect(url)
  }
  return response
}

export const config = {
  // Pages only: skip Next's assets, the registry JSON (/r), bare previews
  // (/view), the auth callback (it sets the session itself) and any file.
  matcher: ["/((?!_next/|r/|view/|auth/|.*\\.[a-z0-9]+$).*)"],
}
