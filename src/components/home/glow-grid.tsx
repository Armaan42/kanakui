"use client"

import * as React from "react"

/**
 * A list whose `.glow-card` children light up their borders near the pointer.
 * It sets `--glow` on itself while the pointer is over it, and each card's
 * `--glow-x` / `--glow-y`, at most once per frame. Pure decoration; without
 * a pointer nothing changes.
 */
export function GlowGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const list = ref.current
    if (!list) return
    let frame = 0
    let x = 0
    let y = 0

    const update = () => {
      frame = 0
      for (const card of list.querySelectorAll<HTMLElement>(".glow-card")) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty("--glow-x", `${x - rect.left}px`)
        card.style.setProperty("--glow-y", `${y - rect.top}px`)
      }
    }
    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      list.style.setProperty("--glow", "1")
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => list.style.setProperty("--glow", "0")

    list.addEventListener("pointermove", onMove, { passive: true })
    list.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      list.removeEventListener("pointermove", onMove)
      list.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  )
}
