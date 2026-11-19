"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface BubbleWrapProps extends React.ComponentProps<"div"> {
  rows?: number
  columns?: number
  onPop?: (popped: number, total: number) => void
}

/**
 * A sheet of bubble wrap. Click bubbles to pop them, or press and drag across
 * the sheet to pop a row at once. Every bubble is a button, so it works from
 * the keyboard too.
 */
function BubbleWrap({ rows = 5, columns = 8, onPop, className, ...props }: BubbleWrapProps) {
  const total = rows * columns
  const [popped, setPopped] = React.useState<Set<number>>(() => new Set())
  const pressing = React.useRef(false)

  const pop = (index: number) => {
    setPopped((current) => {
      if (current.has(index)) return current
      const next = new Set(current).add(index)
      onPop?.(next.size, total)
      return next
    })
  }

  return (
    <div data-slot="bubble-wrap" className={cn("w-full max-w-md", className)} {...props}>
      <div
        role="group"
        aria-label="Bubble wrap"
        onPointerDown={() => (pressing.current = true)}
        onPointerUp={() => (pressing.current = false)}
        onPointerLeave={() => (pressing.current = false)}
        className="grid touch-none gap-1.5 rounded-lg bg-[linear-gradient(135deg,rgb(186_230_253/0.45),rgb(224_242_254/0.25))] p-3 shadow-[0_10px_20px_-12px_rgb(0_0_0/0.35)] ring-1 ring-sky-200/70 dark:ring-sky-900/60"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => {
          const done = popped.has(i)
          return (
            <button
              key={i}
              type="button"
              aria-label={`Bubble ${i + 1}`}
              aria-pressed={done}
              onPointerDown={() => pop(i)}
              onPointerEnter={() => pressing.current && pop(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  pop(i)
                }
              }}
              className={cn(
                "aspect-square rounded-full outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-sky-600 motion-reduce:transition-none",
                done
                  ? "scale-90 bg-sky-100/40 shadow-[inset_0_1px_2px_rgb(0_0_0/0.15)] dark:bg-sky-950/40"
                  : "bg-[radial-gradient(circle_at_35%_30%,white,rgb(224_242_254/0.9)_35%,rgb(125_211_252/0.55))] shadow-[0_2px_4px_rgb(14_116_144/0.25),inset_0_-2px_4px_rgb(14_116_144/0.2)] hover:scale-105"
              )}
            />
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span role="status" className="text-muted-foreground tabular-nums">
          {popped.size === total ? "Every bubble popped. Satisfying." : `${popped.size} of ${total} popped`}
        </span>
        <button type="button" onClick={() => setPopped(new Set())} className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <RotateCcw aria-hidden="true" className="size-3.5" />
          New sheet
        </button>
      </div>
    </div>
  )
}

export { BubbleWrap }
