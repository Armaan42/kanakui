"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  /** Element whose scroll to track. Defaults to the page. */
  target?: React.RefObject<HTMLElement | null>
  /** Accessible name. */
  label?: string
  className?: string
}

/**
 * A thin bar that fills as the reader scrolls through the page (or through
 * a scrollable element passed as `target`). Exposed as a labelled progress
 * bar. Updates at most once per frame and never re-renders on scroll.
 */
function ScrollProgress({ target, label = "Reading progress", className }: ScrollProgressProps) {
  const bar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = target?.current ?? null
    const source: HTMLElement | Window = element ?? window
    let frame = 0

    const update = () => {
      frame = 0
      const node = bar.current
      if (!node) return
      const scrollTop = element ? element.scrollTop : window.scrollY
      const max = element ? element.scrollHeight - element.clientHeight : document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(Math.max(scrollTop / max, 0), 1) : 0
      node.style.transform = `scaleX(${progress})`
      node.parentElement?.setAttribute("aria-valuenow", String(Math.round(progress * 100)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    source.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      source.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [target])

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      data-slot="scroll-progress"
      className={cn("h-1 w-full overflow-hidden bg-transparent", className)}
    >
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-primary" />
    </div>
  )
}

export { ScrollProgress, type ScrollProgressProps }
