import * as React from "react"
import type { Metadata } from "next"

import { SignInCard } from "@/components/site/account/sign-in-card"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Create an account",
  description: `Create an account to save ${siteConfig.name} components, blocks and templates to your favourites.`,
  robots: { index: false },
}

export default function SignUpPage() {
  return (
    <div className="page-container flex flex-1 items-center justify-center py-16 sm:py-24">
      {/* The card reads ?next= and ?error= in the browser, so it streams in after the static shell. */}
      <React.Suspense fallback={<div aria-hidden="true" className="h-[30rem] w-full max-w-sm rounded-2xl border bg-card" />}>
        <SignInCard mode="sign-up" />
      </React.Suspense>
    </div>
  )
}
