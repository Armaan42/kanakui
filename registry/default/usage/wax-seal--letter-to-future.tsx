"use client"

import * as React from "react"

import { WaxSeal } from "@/registry/default/ui/wax-seal"

export const meta = {
  title: "Letter to your future self",
  description: "The wax seal closing a letter in a time-capsule app; once sealed, it's locked until the date you choose.",
}

// The app and letter are made up.
export default function LetterToFuture() {
  const [sealed, setSealed] = React.useState(false)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Paperkite Time Capsule</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">A letter to open on 1 January 2030</h1>
      <p className="mt-2 text-muted-foreground">Seal it when you&apos;re done. We&apos;ll email you on the day, and not a moment before.</p>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
        <article aria-label="Your letter" className="rounded-md border bg-[#fffdf7] p-6 font-serif leading-7 text-neutral-800 shadow-sm">
          <p>Dear Ana in 2030,</p>
          <p className="mt-3">Did you ever learn to sail? Are you still in Lisbon? I hope you kept the habit of swimming before work, and that you finally framed the map from Kyoto.</p>
          <p className="mt-3">Be kind to the version of you reading this.</p>
          <p className="mt-3">Ana, November 2026</p>
        </article>
        <div className="flex flex-col items-center gap-3">
          <WaxSeal className="w-80" initials="AR" onSeal={() => setSealed(true)} onOpen={() => setSealed(false)}>
            <p>Dear Ana in 2030,</p>
            <p className="mt-2">Did you ever learn to sail? Be kind to the version of you reading this.</p>
          </WaxSeal>
          {sealed ? <p className="text-sm font-medium">Locked until 1 January 2030.</p> : null}
        </div>
      </div>
    </div>
  )
}
