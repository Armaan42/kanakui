"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { ItemSummary } from "@/lib/registry"

/** Templates render at laptop width, like block thumbnails. */
const FRAME_WIDTH = 1280
const FRAME_HEIGHT = 800
/** Scroll speeds in px per millisecond, at full size: slow down the page, quick back up. */
const SPEED_DOWN = 0.55
const SPEED_UP = 8

/**
 * Smoothly scrolls the template inside the thumbnail iframe (same origin) to
 * its bottom or top. Does nothing when the user prefers reduced motion.
 */
function useFrameScroll() {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const animation = React.useRef(0)

  const scroll = React.useCallback((direction: "down" | "up") => {
    cancelAnimationFrame(animation.current)
    const win = frameRef.current?.contentWindow
    if (!win || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let from: number
    let to: number
    try {
      from = win.scrollY
      to = direction === "down" ? win.document.documentElement.scrollHeight - win.innerHeight : 0
    } catch {
      return
    }
    const duration = Math.abs(to - from) / (direction === "down" ? SPEED_DOWN : SPEED_UP)
    if (duration <= 0) return
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease in and out going down; ease out coming back.
      const eased = direction === "down" ? t * t * (3 - 2 * t) : 1 - (1 - t) ** 3
      win.scrollTo(0, from + (to - from) * eased)
      if (t < 1) animation.current = requestAnimationFrame(step)
    }
    animation.current = requestAnimationFrame(step)
  }, [])

  React.useEffect(() => () => cancelAnimationFrame(animation.current), [])

  return { frameRef, scroll }
}

/**
 * A scaled-down, non-interactive render of /view/<name>. The card scrolls it
 * through the whole page on hover or focus. The iframe only loads once the
 * card is near the viewport.
 */
function TemplateThumbnail({
  name,
  title,
  frameRef,
}: {
  name: string
  title: string
  frameRef: React.RefObject<HTMLIFrameElement | null>
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState<number | null>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const resize = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / FRAME_WIDTH)
    })
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          visible.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    resize.observe(node)
    visible.observe(node)
    return () => {
      resize.disconnect()
      visible.disconnect()
    }
  }, [])

  // The thumbnail is scrolled by the card, so hide the iframe's own scrollbar.
  const hideScrollbar = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const root = event.currentTarget.contentDocument?.documentElement
      if (root) root.style.scrollbarWidth = "none"
    } catch {
      // Not same-origin (never expected); the scrollbar just stays visible.
    }
  }

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-background">
      {inView && scale ? (
        <iframe
          ref={frameRef}
          src={`/view/${name}`}
          title={`${title} thumbnail`}
          tabIndex={-1}
          aria-hidden="true"
          inert
          loading="lazy"
          onLoad={hideScrollbar}
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
        />
      ) : (
        <div role="status" className="absolute inset-0 animate-pulse bg-muted/50 motion-reduce:animate-none">
          <span className="sr-only">Loading preview</span>
        </div>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 rounded-md border bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur transition-opacity group-hover:opacity-0 motion-reduce:hidden pointer-coarse:hidden"
      >
        Hover to scroll
      </span>
    </div>
  )
}

/** The thumbnail isn't interactive, so the whole card is one link. */
export function TemplateCard({ template }: { template: ItemSummary }) {
  const { frameRef, scroll } = useFrameScroll()

  return (
    <Link
      href={template.href}
      onPointerEnter={() => scroll("down")}
      onPointerLeave={() => scroll("up")}
      onFocus={() => scroll("down")}
      onBlur={() => scroll("up")}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="border-b">
        <TemplateThumbnail name={template.name} title={template.title} frameRef={frameRef} />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 space-y-1">
          <h3 className="font-medium group-hover:underline group-hover:underline-offset-4">{template.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{template.description}</p>
        </div>
        <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
    </Link>
  )
}

export function TemplateGrid({ templates }: { templates: ItemSummary[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {templates.map((template) => (
        <TemplateCard key={template.name} template={template} />
      ))}
    </div>
  )
}
