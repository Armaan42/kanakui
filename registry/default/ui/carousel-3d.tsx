"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface Carousel3dItem {
  id: string
  /** Read out when the item comes to the front. */
  label: string
  content: React.ReactNode
}

interface Carousel3dProps {
  items: Carousel3dItem[]
  /** Card width in pixels. */
  itemWidth?: number
  /** Accessible name for the carousel, e.g. "Featured projects". */
  label?: string
  className?: string
}

/**
 * Cards arranged in a ring that turns in 3D. Previous and Next buttons (or the
 * arrow keys when the carousel has focus) bring each card to the front, and
 * the front card is announced. Only the front card can be focused. With
 * reduced motion the ring jumps instead of turning.
 */
function Carousel3d({ items, itemWidth = 220, label = "Carousel", className }: Carousel3dProps) {
  const [index, setIndex] = React.useState(0)
  const count = items.length
  const angle = 360 / Math.max(count, 1)
  // Radius so neighbouring cards just touch, plus a little gap.
  const radius = Math.round(itemWidth / 2 / Math.tan(Math.PI / Math.max(count, 3))) + 24
  const front = ((index % count) + count) % count

  const go = (step: number) => setIndex((i) => i + step)

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      data-slot="carousel-3d"
      className={cn("flex w-full flex-col items-center gap-6", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1)
        if (event.key === "ArrowRight") go(1)
      }}
    >
      <div className="relative h-72 w-full overflow-hidden [perspective:1100px]">
        <div
          className="absolute top-1/2 left-1/2 transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
          style={{ transform: `translate(-50%, -50%) translateZ(${-radius}px) rotateY(${-index * angle}deg)` }}
        >
          {items.map((item, i) => {
            const isFront = i === front
            return (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${item.label}`}
                aria-hidden={!isFront}
                inert={!isFront ? true : undefined}
                className={cn(
                  "absolute top-1/2 left-1/2 h-60 overflow-hidden rounded-xl border bg-card transition-opacity duration-500",
                  isFront ? "opacity-100" : "opacity-60"
                )}
                style={{
                  width: itemWidth,
                  transform: `translate(-50%, -50%) rotateY(${i * angle}deg) translateZ(${radius}px)`,
                }}
              >
                {item.content}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full border bg-background outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <p aria-live="polite" className="min-w-32 text-center text-sm text-muted-foreground">
          {items[front]?.label}
        </p>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="inline-flex size-9 items-center justify-center rounded-full border bg-background outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </section>
  )
}

export { Carousel3d, type Carousel3dItem, type Carousel3dProps }
