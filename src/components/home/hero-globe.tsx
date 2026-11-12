"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { useThemeState } from "@/components/site/theme-config"

// three.js is large; the globe loads only in the browser, once the page is idle.
const ArcGlobe = dynamic(() => import("@/registry/default/ui/arc-globe").then((m) => m.ArcGlobe), { ssr: false })

/**
 * The hero's globe: kanakui's own Arc Globe component. Its square box is
 * reserved from the first paint (with a soft glow in its place), so nothing
 * shifts when the globe fades in.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const [ready, setReady] = React.useState(false)
  // Arc colors go to three.js as props, so they switch with the theme here;
  // the dots follow the CSS text color on their own. `transition-none` matters:
  // `duration-*` would otherwise fade the text color too, and the globe would
  // read a half-way color when the theme changes.
  const { mode } = useThemeState()
  const arcColors: [string, string] = mode === "light" ? ["#7c3aed", "#0891b2"] : ["#a78bfa", "#22d3ee"]

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
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.16_285/0.22),oklch(0.75_0.12_230/0.08)_45%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,oklch(0.55_0.2_285/0.35),oklch(0.6_0.15_230/0.12)_45%,transparent_70%)]"
      />
      {ready ? (
        <ArcGlobe
          startLongitude={35}
          arcColors={arcColors}
          className="absolute inset-0 animate-in text-indigo-600 transition-none dark:text-indigo-100 duration-[1800ms] fade-in zoom-in-95 motion-reduce:animate-none"
        />
      ) : null}
    </div>
  )
}
