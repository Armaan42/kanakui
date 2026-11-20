"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ServiceBellProps extends React.ComponentProps<"div"> {
  /** Engraved on the base. */
  label?: string
  sound?: boolean
  onRing?: (count: number) => void
}

/** A brass service bell on a wooden base. Tap it (or press Enter) for a ding. */
function ServiceBell({ label = "Please ring", sound = true, onRing, className, ...props }: ServiceBellProps) {
  const [rings, setRings] = React.useState(0)
  const [pressed, setPressed] = React.useState(false)
  const audio = React.useRef<AudioContext | null>(null)

  const ding = () => {
    const count = rings + 1
    setRings(count)
    onRing?.(count)
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const now = ctx.currentTime
      for (const [frequency, level, decay] of [[2093, 0.14, 2.4], [5776, 0.04, 0.9], [11300, 0.015, 0.3]] as const) {
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.frequency.value = frequency
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(level, now + 0.003)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay)
        tone.connect(gain).connect(ctx.destination)
        tone.start(now)
        tone.stop(now + decay + 0.05)
      }
    } catch {
      // No Web Audio: the bell still wobbles.
    }
  }

  return (
    <div data-slot="service-bell" className={cn("flex w-60 max-w-full flex-col items-center gap-4", className)} {...props}>
      <button
        type="button"
        aria-label="Ring the bell"
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") setPressed(true)
        }}
        onKeyUp={() => setPressed(false)}
        onClick={ding}
        className="group relative h-44 w-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        {/* Base. */}
        <span aria-hidden="true" className="absolute inset-x-2 top-[8.4rem] h-8 rounded-[50%] bg-linear-to-b from-neutral-700 to-neutral-950 shadow-[0_10px_16px_-6px_rgb(0_0_0/0.6)]" />
        <span aria-hidden="true" className="absolute inset-x-6 top-[8.1rem] h-4 rounded-[50%] bg-linear-to-b from-yellow-600 to-yellow-900" />
        {/* Plunger. */}
        <span
          aria-hidden="true"
          className={cn("absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center transition-transform duration-75", pressed && "translate-y-2")}
        >
          <span className="size-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fefce8,#ca8a04_60%,#713f12)] shadow-[0_2px_3px_rgb(0_0_0/0.4)]" />
          <span className="h-5 w-1.5 bg-linear-to-r from-yellow-700 via-yellow-200 to-yellow-700" />
        </span>
        {/* Dome. */}
        <span
          key={rings}
          aria-hidden="true"
          className={cn("absolute top-[3.7rem] left-1/2 h-[4.75rem] w-40 -translate-x-1/2 origin-bottom rounded-t-full bg-[radial-gradient(ellipse_at_35%_25%,#fffbeb_0%,#fde68a_12%,#ca8a04_45%,#854d0e_80%,#422006)] shadow-[inset_0_-6px_10px_rgb(0_0_0/0.25)] group-hover:brightness-105", rings > 0 && "animate-service-bell-wobble motion-reduce:animate-none")}
        >
          <span className="absolute top-3 left-8 h-8 w-5 -rotate-30 rounded-full bg-white/50 blur-[3px]" />
        </span>
      </button>
      <p className="font-serif text-sm text-muted-foreground italic">{label}</p>
      <p role="status" className="min-h-5 text-sm">
        {rings === 0 ? "" : rings === 1 ? "Ding! Someone will be right with you." : `Ding! Rung ${rings} times.`}
      </p>
    </div>
  )
}

export { ServiceBell }
