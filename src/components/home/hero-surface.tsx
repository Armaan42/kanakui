"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import { usePointerPosition } from "@/registry/default/hooks/use-pointer-position"

// three.js is large; it loads only in the browser, after the page is idle.
const ParticleWave = dynamic(() => import("@/registry/default/ui/particle-wave").then((m) => m.ParticleWave), {
  ssr: false,
})

/**
 * The hero's section element and its moving backdrop: a soft light from the
 * top, a glow that follows the pointer, and a 3D particle wave along the
 * bottom. All three are decorative and hidden from assistive technology. The
 * hero's content is passed in as children and stays server-rendered.
 */
export function HeroSurface({ className, children }: { className?: string; children: React.ReactNode }) {
  const pointerRef = usePointerPosition<HTMLElement>()
  const [showWave, setShowWave] = React.useState(false)

  React.useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShowWave(true), { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setShowWave(true), 1200)
    return () => clearTimeout(id)
  }, [])

  return (
    <section ref={pointerRef} className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(ellipse_45%_55%_at_50%_0%,color-mix(in_oklch,var(--foreground)_5%,transparent),transparent)] dark:bg-[radial-gradient(ellipse_45%_55%_at_50%_0%,color-mix(in_oklch,var(--foreground)_13%,transparent),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-(--pointer-active,0) transition-opacity duration-500 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(560px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), color-mix(in oklch, var(--foreground) 7%, transparent), transparent 65%)",
        }}
      />
      {showWave ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-104 animate-in opacity-55 duration-1000 fade-in [mask-image:linear-gradient(to_top,black_35%,transparent)] motion-reduce:animate-none"
        >
          <ParticleWave columns={90} rows={44} amplitude={0.5} className="h-full text-muted-foreground" />
        </div>
      ) : null}
      {children}
    </section>
  )
}
