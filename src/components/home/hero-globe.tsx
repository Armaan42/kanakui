"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { useThemeState } from "@/components/site/theme-config"

// three.js is large; the globe loads only in the browser, once the page is idle.
const ArcGlobe = dynamic(() => import("@/registry/default/ui/arc-globe").then((m) => m.ArcGlobe), { ssr: false })

/**
 * Arc Globe's camera (fov 45°, 3.1 units away) shows its unit sphere as a disc
 * 82.3% as wide as the canvas: tan(asin(1 / 3.1)) / tan(22.5°). The body below
 * is inset by the remaining 8.85% on each side so it sits exactly behind it.
 */
const BODY_INSET = "inset-[8.85%]"

/** Per-theme colors that go to three.js as props (the dots follow the CSS text color). */
const SCENE = {
  light: { arcColors: ["#6d28d9", "#0e7490"] as [string, string], atmosphere: "#c7d2fe" },
  dark: { arcColors: ["#a78bfa", "#22d3ee"] as [string, string], atmosphere: "#6d5dfc" },
}

/**
 * The hero's globe: kanakui's own Arc Globe component. Its square box is
 * reserved from the first paint, so nothing shifts when the globe fades in.
 *
 * Arc Globe has no surface of its own (the page shows through), so in light
 * mode it gets a shaded porcelain body behind it; in dark mode the page and a
 * violet glow do that job.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const [ready, setReady] = React.useState(false)
  const { mode } = useThemeState()
  const scene = SCENE[mode]

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
      {/* Dark: a violet glow behind the globe. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] hidden rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_285/0.35),oklch(0.6_0.15_230/0.12)_45%,transparent_70%)] blur-2xl dark:block"
      />
      {/* Light: a porcelain sphere, lit from the top left, with a soft shadow below. */}
      <div aria-hidden="true" className={`pointer-events-none absolute ${BODY_INSET} rounded-full dark:hidden`}>
        <div className="absolute inset-x-[12%] -bottom-[9%] h-[16%] rounded-[50%] bg-indigo-950/20 blur-2xl" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_28%,#ffffff_0%,oklch(0.985_0.006_280)_32%,oklch(0.95_0.02_280)_70%,oklch(0.905_0.035_282)_100%)] shadow-[inset_-14px_-20px_50px_oklch(0.62_0.1_282/0.14),inset_10px_14px_30px_#ffffff,0_0_0_1px_oklch(0.55_0.12_282/0.08)]" />
      </div>
      {ready ? (
        <ArcGlobe
          startLongitude={35}
          arcColors={scene.arcColors}
          atmosphereColor={scene.atmosphere}
          // `transition-none`: `duration-*` would otherwise also fade the text
          // color, and the globe would read a half-way color on a theme change.
          className="absolute inset-0 animate-in text-indigo-600 transition-none duration-[1800ms] fade-in zoom-in-95 motion-reduce:animate-none dark:text-indigo-100"
        />
      ) : null}
    </div>
  )
}
