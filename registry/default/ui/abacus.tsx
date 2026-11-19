"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface AbacusProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Number of rods (digits). */
  rods?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
}

const BEAD_COLORS = ["#b45309", "#be123c", "#047857", "#1d4ed8", "#6d28d9", "#c2410c", "#0f766e", "#a21caf"]

/**
 * A soroban abacus. Each rod is one digit: the top bead counts five, the
 * four below count one each. Click a bead to slide it to the bar, or focus a
 * rod and use the arrow keys (each rod is a slider from 0 to 9).
 */
function Abacus({ rods = 6, defaultValue = 2026, onValueChange, className, ...props }: AbacusProps) {
  const [digits, setDigits] = React.useState(() => String(defaultValue).padStart(rods, "0").slice(-rods).split("").map(Number))
  const value = Number(digits.join(""))

  const setDigit = (rod: number, digit: number) => {
    const next = digits.map((d, i) => (i === rod ? Math.min(9, Math.max(0, digit)) : d))
    setDigits(next)
    onValueChange?.(Number(next.join("")))
  }

  return (
    <div data-slot="abacus" className={cn("w-full max-w-md", className)} {...props}>
      <div className="rounded-xl bg-[linear-gradient(180deg,#78350f,#92400e)] p-2.5 shadow-[0_16px_26px_-14px_rgb(0_0_0/0.6)]">
        <div className="relative flex justify-around rounded-md bg-[#fbf3e4] px-2 py-3 dark:bg-[#2a2118]">
          <span aria-hidden="true" className="absolute inset-x-0 top-[31%] h-2 bg-[#78350f]" />
          {digits.map((digit, rod) => {
            const five = digit >= 5
            const ones = digit % 5
            const color = BEAD_COLORS[rod % BEAD_COLORS.length]
            return (
              <div
                key={rod}
                role="slider"
                tabIndex={0}
                aria-label={`Rod ${rod + 1}`}
                aria-valuemin={0}
                aria-valuemax={9}
                aria-valuenow={digit}
                onKeyDown={(event) => {
                  const step = event.key === "ArrowUp" || event.key === "ArrowRight" ? 1 : event.key === "ArrowDown" || event.key === "ArrowLeft" ? -1 : 0
                  if (!step) return
                  event.preventDefault()
                  setDigit(rod, digit + step)
                }}
                className="relative flex h-52 w-9 flex-col items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-neutral-400" />
                {/* Heaven bead (5) */}
                <span
                  aria-hidden="true"
                  data-bead="five"
                  onClick={() => setDigit(rod, five ? digit - 5 : digit + 5)}
                  className="relative mt-1 h-6 w-9 cursor-pointer rounded-[50%] shadow-[inset_0_-3px_4px_rgb(0_0_0/0.3),inset_0_2px_2px_rgb(255_255_255/0.4)] transition-transform duration-200 motion-reduce:transition-none"
                  style={{ background: color, transform: `translateY(${five ? 30 : 0}px)` }}
                />
                {/* Earth beads (1 each) */}
                <div className="relative mt-auto flex flex-col gap-0.5 pb-1">
                  {[0, 1, 2, 3].map((bead) => {
                    const up = bead < ones
                    return (
                      <span
                        key={bead}
                        aria-hidden="true"
                        data-bead="one"
                        onClick={() => setDigit(rod, (five ? 5 : 0) + (up ? bead : bead + 1))}
                        className="relative h-6 w-9 cursor-pointer rounded-[50%] shadow-[inset_0_-3px_4px_rgb(0_0_0/0.3),inset_0_2px_2px_rgb(255_255_255/0.4)] transition-transform duration-200 motion-reduce:transition-none"
                        style={{ background: color, transform: `translateY(${up ? -22 : 0}px)` }}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <p aria-live="polite" className="mt-3 text-center font-mono text-2xl tabular-nums">
        {value.toLocaleString("en-US")}
      </p>
    </div>
  )
}

export { Abacus }
