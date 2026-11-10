"use client"

import * as React from "react"
import dynamic from "next/dynamic"

// three.js is large; the galaxy loads only in the browser, once the page is idle.
const Galaxy = dynamic(() => import("@/components/home/galaxy").then((m) => m.Galaxy), { ssr: false })

/** The hero's galaxy, faded in after the page has settled. */
export function HeroGalaxy({ className }: { className?: string }) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setReady(true), 800)
    return () => clearTimeout(id)
  }, [])

  return ready ? (
    <Galaxy className={`${className ?? ""} animate-in duration-[2400ms] fade-in motion-reduce:animate-none`} />
  ) : null
}
