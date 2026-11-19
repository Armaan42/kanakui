"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface NewtonsCradleProps extends React.ComponentProps<"div"> {
  balls?: number
  /** Seconds before it comes to rest. */
  duration?: number
}

const SWING = 34
const PERIOD = 1.05

/**
 * A Newton's cradle. Press "Lift and let go" (or click an end ball): the
 * outer balls trade the swing back and forth, losing a little height each
 * time, and click to rest.
 */
function NewtonsCradle({ balls = 5, duration = 7, className, ...props }: NewtonsCradleProps) {
  const [angles, setAngles] = React.useState({ left: 0, right: 0 })
  const [swinging, setSwinging] = React.useState(false)
  const frame = React.useRef(0)

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const release = (side: "left" | "right") => {
    cancelAnimationFrame(frame.current)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setSwinging(true)
    let start: number | undefined
    const step = (now: number) => {
      start ??= now
      const t = (now - start) / 1000
      const amplitude = SWING * Math.exp(-t / (duration / 3))
      // Each half period one end ball is out: cos from the top down to the stack.
      const phase = (t % PERIOD) / PERIOD
      const out = Math.sin(phase * Math.PI) * amplitude
      const firstHalf = phase < 0.5
      const leftOut = side === "left" ? (firstHalf ? 0 : out) : firstHalf ? out : 0
      const rightOut = side === "left" ? (firstHalf ? out : 0) : firstHalf ? 0 : out
      setAngles({ left: leftOut, right: rightOut })
      if (t < duration && amplitude > 0.4) frame.current = requestAnimationFrame(step)
      else {
        setAngles({ left: 0, right: 0 })
        setSwinging(false)
      }
    }
    // Start with the chosen ball lifted.
    setAngles(side === "left" ? { left: SWING, right: 0 } : { left: 0, right: SWING })
    frame.current = requestAnimationFrame(step)
  }

  return (
    <div data-slot="newtons-cradle" className={cn("flex w-80 max-w-full flex-col items-center", className)} {...props}>
      <div className="relative h-56 w-full">
        <span aria-hidden="true" className="absolute inset-x-4 top-2 h-2 rounded-full bg-linear-to-b from-neutral-300 to-neutral-500 shadow" />
        <span aria-hidden="true" className="absolute top-2 left-4 h-52 w-1.5 rounded-full bg-neutral-400" />
        <span aria-hidden="true" className="absolute top-2 right-4 h-52 w-1.5 rounded-full bg-neutral-400" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-linear-to-b from-neutral-700 to-neutral-900" />
        <div className="absolute inset-x-0 top-3 flex justify-center">
          {Array.from({ length: balls }, (_, i) => {
            const end = i === 0 ? "left" : i === balls - 1 ? "right" : null
            const angle = i === 0 ? angles.left : i === balls - 1 ? -angles.right : 0
            const Ball = end ? "button" : "span"
            return (
              <span key={i} className="flex origin-top flex-col items-center" style={{ rotate: `${angle}deg` }}>
                <span aria-hidden="true" className="h-36 w-px bg-neutral-500" />
                <Ball
                  {...(end ? { type: "button" as const, onClick: () => release(end), "aria-label": `Lift the ${end} ball and let go`, disabled: swinging } : { "aria-hidden": true })}
                  className="-mt-1 size-10 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d4d4d8_30%,#71717a_75%,#3f3f46)] shadow-[0_6px_10px_-4px_rgb(0_0_0/0.5)] outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
                />
              </span>
            )
          })}
        </div>
      </div>
      <button type="button" onClick={() => release("left")} disabled={swinging} className="mt-4 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60">
        Lift and let go
      </button>
      <p role="status" className="mt-2 min-h-4 text-xs text-muted-foreground">
        {swinging ? "Click… click… click…" : ""}
      </p>
    </div>
  )
}

export { NewtonsCradle }
