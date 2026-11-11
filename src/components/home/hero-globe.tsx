"use client"

import * as React from "react"
import dynamic from "next/dynamic"

// three.js is large; the globe loads only in the browser, once the page is idle.
const ArcGlobe = dynamic(() => import("@/components/home/arc-globe").then((m) => m.ArcGlobe), { ssr: false })

/**
 * The hero's globe. Its square box is reserved from the first paint (with a
 * soft glow in its place), so nothing shifts when the globe fades in.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setReady(true), 800)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_285/0.35),oklch(0.6_0.15_230/0.12)_45%,transparent_70%)] blur-2xl"
      />
      {ready ? (
        <ArcGlobe className="absolute inset-0 animate-in duration-[1800ms] fade-in zoom-in-95 motion-reduce:animate-none" />
      ) : null}
    </div>
  )
}
