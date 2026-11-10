"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ImageCompareProps {
  /** Shown on the left of the divider, e.g. an image before editing. */
  before: React.ReactNode
  /** Shown on the right of the divider. */
  after: React.ReactNode
  /** Short names for each side, shown as labels and used in the slider's accessible name. */
  beforeLabel?: string
  afterLabel?: string
  /** Starting divider position, 0–100. */
  defaultPosition?: number
  className?: string
}

/**
 * Two layers with a draggable divider to compare them. The divider is a real
 * range input, so it works with mouse, touch and keyboard (arrows, Home, End).
 */
function ImageCompare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  defaultPosition = 50,
  className,
}: ImageCompareProps) {
  const [position, setPosition] = React.useState(defaultPosition)

  return (
    <div
      data-slot="image-compare"
      className={cn("group relative isolate aspect-video w-full overflow-hidden rounded-xl border select-none", className)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before}
      </div>

      <span className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">{beforeLabel}</span>
      <span className="absolute top-3 right-3 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">{afterLabel}</span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-background" style={{ left: `${position}%` }}>
        <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-sm group-has-[input:focus-visible]:ring-3 group-has-[input:focus-visible]:ring-ring/50">
          <svg viewBox="0 0 16 16" className="size-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4 2 8l4 4M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
        className="absolute inset-0 z-10 size-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  )
}

export { ImageCompare, type ImageCompareProps }
