"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { ItemSummary } from "@/lib/registry"

/** Blocks are designed for this width; thumbnails show them as on a laptop screen. */
const FRAME_WIDTH = 1280
const FRAME_HEIGHT = 800

/**
 * A scaled-down, non-interactive render of /view/<name> at desktop width.
 * The iframe only loads once the card is near the viewport.
 */
function BlockThumbnail({ name, title }: { name: string; title: string }) {
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

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-background">
      {inView && scale ? (
        <iframe
          src={`/view/${name}`}
          title={`${title} thumbnail`}
          tabIndex={-1}
          aria-hidden="true"
          inert
          loading="lazy"
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
        />
      ) : (
        <div role="status" className="absolute inset-0 animate-pulse bg-muted/50 motion-reduce:animate-none">
          <span className="sr-only">Loading preview</span>
        </div>
      )}
    </div>
  )
}

/** The thumbnail isn't interactive, so the whole card is one link. */
export function BlockCard({ block }: { block: ItemSummary }) {
  return (
    <Link
      href={block.href}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="border-b">
        <BlockThumbnail name={block.name} title={block.title} />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 space-y-1">
          <h3 className="font-medium group-hover:underline group-hover:underline-offset-4">{block.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{block.description}</p>
        </div>
        <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
    </Link>
  )
}

export function BlockGrid({ blocks }: { blocks: ItemSummary[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {blocks.map((block) => (
        <BlockCard key={block.name} block={block} />
      ))}
    </div>
  )
}
