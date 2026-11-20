"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface NixieTubesProps extends React.ComponentProps<"div"> {
  /** Digits (and colons) to show. Leave it out for a live 24-hour clock. */
  value?: string
  /** Read out with the value, e.g. "Visitors". */
  label?: string
}

/** Real nixie tubes stack their cathodes in this order, front to back. */
const STACK = ["1", "6", "2", "7", "5", "0", "4", "9", "8", "3"]
const pad = (value: number) => String(value).padStart(2, "0")

function Tube({ digit }: { digit: string }) {
  return (
    <span className="relative flex h-20 w-11 flex-col items-center sm:h-28 sm:w-16">
      <span className="relative flex-1 self-stretch overflow-hidden rounded-t-[1.75rem] rounded-b-md border border-white/15 bg-linear-to-b from-white/10 via-orange-950/20 to-white/5 shadow-[inset_0_0_12px_rgb(0_0_0/0.6)]">
        {STACK.map((cathode, depth) => (
          <span
            key={cathode}
            className={cn(
              "absolute inset-0 grid place-items-center pt-2 font-sans text-4xl font-light transition-[color,text-shadow,opacity] duration-150 sm:text-6xl",
              cathode === digit ? "z-20 text-orange-200" : "text-stone-500/25"
            )}
            style={{
              textShadow: cathode === digit ? "0 0 4px #ff9a3c, 0 0 12px #ff6a00, 0 0 24px #ff5500" : "none",
              transform: cathode === digit ? undefined : `scale(${1 - depth * 0.015})`,
            }}
          >
            {cathode}
          </span>
        ))}
        {/* The anode mesh in front of the digits. */}
        <span className="absolute inset-0 z-30 bg-[repeating-linear-gradient(60deg,transparent_0_5px,rgb(0_0_0/0.18)_5px_6px),repeating-linear-gradient(-60deg,transparent_0_5px,rgb(0_0_0/0.18)_5px_6px)]" />
        <span className="absolute top-2 left-2 z-30 h-10 w-2 rounded-full bg-white/15 blur-[1px]" />
      </span>
      <span className="h-3 w-[110%] rounded-b-md bg-linear-to-b from-neutral-700 to-neutral-950" />
    </span>
  )
}

/**
 * Glowing nixie tubes, showing a number you pass in or, with no value, a live
 * clock. Every tube holds all ten digits; only the lit one glows.
 */
function NixieTubes({ value, label, className, ...props }: NixieTubesProps) {
  const [now, setNow] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (value !== undefined) return
    const update = () => {
      const date = new Date()
      setNow(`${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`)
    }
    const first = window.setTimeout(update, 0)
    const id = window.setInterval(update, 1000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(id)
    }
  }, [value])

  const shown = value ?? now ?? "  :  :  "
  const spoken = value === undefined ? (now ? `Time ${now}` : "Clock") : `${label ? `${label}: ` : ""}${value}`

  return (
    <div
      data-slot="nixie-tubes"
      role={value === undefined ? "timer" : undefined}
      className={cn("relative inline-flex max-w-full items-end gap-1 overflow-x-auto rounded-2xl bg-linear-to-b from-neutral-900 to-black p-4 pb-3 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.1)] sm:gap-2", className)}
      {...props}
    >
      <span className="sr-only">{spoken}</span>
      {[...shown].map((char, i) =>
        char === ":" ? (
          <span key={i} aria-hidden="true" className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4">
            {[0, 1].map((dot) => (
              <span key={dot} className="size-2 rounded-full bg-orange-300 shadow-[0_0_8px_2px_#ff6a00]" />
            ))}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            <Tube digit={char} />
          </span>
        )
      )}
    </div>
  )
}

export { NixieTubes }
