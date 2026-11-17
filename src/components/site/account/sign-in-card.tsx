"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, Loader2 } from "lucide-react"

import { GoogleIcon, LogoMark } from "@/components/site/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { safeNextPath } from "@/lib/supabase/config"

const ERRORS: Record<string, string> = {
  cancelled: "Sign-in was cancelled. Try again whenever you’re ready.",
  provider: "Google couldn’t complete the sign-in. Please try again.",
  exchange: "That sign-in link expired or was already used. Please try again.",
  missing_code: "That sign-in link was incomplete. Please try again.",
  not_configured: "Sign-in isn’t set up on this site yet.",
}

const COPY = {
  "sign-in": {
    title: `Sign in to ${siteConfig.name}`,
    description: "Save components, blocks and templates to your favourites and find them on any device.",
    switchText: "New here?",
    switchLabel: "Create an account",
    switchHref: "/sign-up",
  },
  "sign-up": {
    title: `Create your ${siteConfig.name} account`,
    description: "Free. Save components, blocks and templates to your favourites and find them on any device.",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/sign-in",
  },
} as const

export function SignInCard({ mode }: { mode: keyof typeof COPY }) {
  const params = useSearchParams()
  const next = safeNextPath(params.get("next"))
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(() => {
    const code = params.get("error")
    return code ? (ERRORS[code] ?? ERRORS.provider) : null
  })
  const copy = COPY[mode]
  const supabase = getBrowserSupabase()

  async function continueWithGoogle() {
    if (!supabase) return
    setPending(true)
    setError(null)
    const callback = new URL("/auth/callback", window.location.origin)
    if (next !== "/account") callback.searchParams.set("next", next)
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: callback.toString() } })
    // On success the browser is already on its way to Google.
    if (error) {
      setPending(false)
      setError(/not enabled|unsupported provider/i.test(error.message) ? "Google sign-in isn’t switched on yet." : ERRORS.provider)
    }
  }

  const switchHref = next === "/account" ? copy.switchHref : `${copy.switchHref}?next=${encodeURIComponent(next)}`

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-8 text-card-foreground shadow-sm">
      <LogoMark className="size-7" />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{copy.title}</h1>
      <p className="mt-2 text-sm text-pretty text-muted-foreground">{copy.description}</p>

      <div className="mt-8 space-y-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full gap-2.5"
          disabled={!supabase || pending}
          onClick={continueWithGoogle}
        >
          {pending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <GoogleIcon className="size-4" />}
          {pending ? "Opening Google…" : "Continue with Google"}
        </Button>
        <p role="alert" aria-live="polite" className="min-h-5 text-sm text-destructive">
          {!supabase ? ERRORS.not_configured : error}
        </p>
      </div>

      <ul className="mt-2 space-y-2 border-t pt-6 text-sm text-muted-foreground">
        <li className="flex gap-2">
          <Heart aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          Everything stays free. An account only adds favourites.
        </li>
      </ul>

      <p className="mt-6 text-xs leading-5 text-muted-foreground">
        We use your Google name, email and photo for your account and nothing else. See the{" "}
        <Link href="/privacy" className="text-foreground underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        {copy.switchText}{" "}
        <Link href={switchHref} className="font-medium text-foreground underline underline-offset-4">
          {copy.switchLabel}
        </Link>
      </p>
    </div>
  )
}
