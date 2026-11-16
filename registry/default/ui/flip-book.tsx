"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface FlipBookProps extends React.ComponentProps<"div"> {
  /** Pages in order. The first is the front cover; pages then pair up as left and right. */
  pages: React.ReactNode[]
  /** Accessible name, e.g. the book's title. */
  label: string
}

/**
 * A book whose pages turn in 3D. Use the buttons, click the left or right
 * page, or focus the book and press the arrow keys. Only the open spread is
 * exposed to screen readers. With reduced motion pages turn instantly.
 */
function FlipBook({ pages, label, className, ...props }: FlipBookProps) {
  const leaves = Math.ceil(pages.length / 2)
  const [turned, setTurned] = React.useState(0)

  const go = (delta: number) => setTurned((t) => Math.min(leaves, Math.max(0, t + delta)))

  // Visible pages: the back of the last turned leaf (left) and the front of the next (right).
  const leftPage = turned > 0 ? 2 * turned - 1 : null
  const rightPage = turned < leaves ? 2 * turned : null
  const visible = [leftPage, rightPage].filter((p): p is number => p !== null && p < pages.length)
  const status =
    visible.length === 0 ? "" : visible.length === 1 ? `Page ${visible[0] + 1} of ${pages.length}` : `Pages ${visible[0] + 1}–${visible[1] + 1} of ${pages.length}`

  // A closed book sits centered; an open one is centered on its spine.
  const shift = turned === 0 ? "-25%" : turned === leaves ? "25%" : "0%"

  const pageFace = "absolute inset-0 overflow-hidden bg-[#fdfbf6] text-neutral-800 backface-hidden"

  return (
    <div data-slot="flip-book" className={cn("flex w-full max-w-3xl flex-col items-center gap-5", className)} {...props}>
      <div
        role="group"
        aria-roledescription="book"
        aria-label={`${label}. Use the left and right arrow keys to turn pages.`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault()
            go(1)
          } else if (event.key === "ArrowLeft") {
            event.preventDefault()
            go(-1)
          }
        }}
        className="relative aspect-[3/2] w-full rounded-md outline-none perspective-[2200px] focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.45,0.05,0.25,1)] transform-3d motion-reduce:transition-none"
          style={{ transform: `translateX(${shift})` }}
        >
          {Array.from({ length: leaves }, (_, i) => {
            const isTurned = i < turned
            const front = 2 * i
            const back = 2 * i + 1
            return (
              <div
                key={i}
                onClick={() => go(isTurned ? -1 : 1)}
                className="absolute top-0 left-1/2 h-full w-1/2 cursor-pointer origin-left transition-transform duration-700 ease-[cubic-bezier(0.45,0.05,0.25,1)] transform-3d motion-reduce:transition-none"
                style={{
                  transform: isTurned ? "rotateY(-180deg)" : "rotateY(0deg)",
                  zIndex: isTurned ? i + 1 : leaves - i,
                }}
              >
                {/* Front: a right-hand page. */}
                <div
                  aria-hidden={rightPage !== front}
                  inert={rightPage !== front}
                  className={cn(pageFace, "rounded-r-md shadow-[inset_14px_0_18px_-14px_rgb(0_0_0/0.35),0_10px_25px_-12px_rgb(0_0_0/0.4)]")}
                >
                  {pages[front]}
                </div>
                {/* Back: a left-hand page. */}
                <div
                  aria-hidden={leftPage !== back}
                  inert={leftPage !== back}
                  className={cn(pageFace, "rounded-l-md [transform:rotateY(180deg)] shadow-[inset_-14px_0_18px_-14px_rgb(0_0_0/0.35),0_10px_25px_-12px_rgb(0_0_0/0.4)]")}
                >
                  {pages[back]}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous page"
          disabled={turned === 0}
          onClick={() => go(-1)}
          className="grid size-9 place-items-center rounded-full border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <p aria-live="polite" className="min-w-36 text-center text-sm text-muted-foreground tabular-nums">
          {turned === 0 ? "Cover" : turned === leaves ? "Back cover" : status}
        </p>
        <button
          type="button"
          aria-label="Next page"
          disabled={turned === leaves}
          onClick={() => go(1)}
          className="grid size-9 place-items-center rounded-full border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}

export { FlipBook }
