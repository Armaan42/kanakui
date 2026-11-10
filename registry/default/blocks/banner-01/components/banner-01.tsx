"use client"

import * as React from "react"
import { ArrowRight, X } from "lucide-react"

/**
 * A slim announcement bar for the top of the page with a link and a dismiss
 * button. Dismissal lasts for the visit; persist it (e.g. in localStorage)
 * if it should stay hidden.
 */
export function Banner01() {
  const [open, setOpen] = React.useState(true)
  if (!open) return null

  return (
    <div role="region" aria-label="Announcement" className="relative border-b bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-3 px-10 py-2.5 text-sm">
        <p className="text-center">
          <span className="font-medium">Version 3.0 is here.</span>{" "}
          <span className="opacity-80">3D components, a new docs site and more.</span>
        </p>
        <a href="#" className="hidden shrink-0 items-center gap-1 font-medium underline-offset-4 hover:underline sm:inline-flex">
          Read more <ArrowRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md opacity-80 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-background"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}
