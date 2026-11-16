"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface PullCordLampProps extends Omit<React.ComponentProps<"div">, "onToggle"> {
  /** Controlled state. Ignored when `controlsTheme` is set. */
  on?: boolean
  defaultOn?: boolean
  onToggle?: (on: boolean) => void
  /** Pull to switch the page between light (lamp on) and dark (lamp off) by toggling `.dark` on `<html>`. */
  controlsTheme?: boolean
  /** Accessible name for the cord, e.g. "Light". */
  label?: string
}

const PULL_DISTANCE = 28
const MAX_PULL = 56

/** Whether `<html>` has the `.dark` class, kept in sync as it changes. */
function useHtmlDark() {
  return React.useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
      return () => observer.disconnect()
    },
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
}

/**
 * A hanging lamp with a pull cord. Drag the bead down and let go (or click
 * it, or press Enter or Space) to switch the lamp; it swings a little each
 * time. With `controlsTheme` it switches the page between light and dark.
 */
function PullCordLamp({ on: onProp, defaultOn = true, onToggle, controlsTheme = false, label = "Light", className, ...props }: PullCordLampProps) {
  const htmlDark = useHtmlDark()
  const [uncontrolled, setUncontrolled] = React.useState(defaultOn)
  const on = controlsTheme ? !htmlDark : (onProp ?? uncontrolled)
  const [pull, setPull] = React.useState<number | null>(null)
  const [swings, setSwings] = React.useState(0)
  const start = React.useRef(0)
  const dragged = React.useRef(false)

  const toggle = () => {
    const next = !on
    if (controlsTheme) document.documentElement.classList.toggle("dark", !next)
    setUncontrolled(next)
    setSwings((n) => n + 1)
    onToggle?.(next)
  }

  return (
    <div data-slot="pull-cord-lamp" data-on={on || undefined} className={cn("relative flex w-56 flex-col items-center select-none", className)} {...props}>
      {/* Light from the bulb. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-[9.5rem] left-1/2 h-[26rem] w-[34rem] -translate-x-1/2 transition-opacity duration-500 [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]",
          "bg-[radial-gradient(ellipse_at_top,rgb(253_224_71/0.35),rgb(253_186_116/0.12)_45%,transparent_75%)]",
          on ? "opacity-100" : "opacity-0"
        )}
      />

      {/* The lamp, which swings from its ceiling mount. */}
      <div key={swings} className={cn("flex origin-top flex-col items-center", swings > 0 && "animate-pull-cord-lamp-swing motion-reduce:animate-none")}>
        <span aria-hidden="true" className="h-3 w-8 rounded-b-md bg-neutral-400 dark:bg-neutral-600" />
        <span aria-hidden="true" className="h-24 w-px bg-neutral-500" />
        {/* Shade */}
        <span aria-hidden="true" className="relative h-16 w-36">
          <span className="absolute inset-0 bg-linear-to-b from-neutral-700 via-neutral-800 to-neutral-950 [clip-path:polygon(32%_0,68%_0,100%_100%,0_100%)] dark:from-neutral-500 dark:via-neutral-700 dark:to-neutral-900" />
          <span className="absolute inset-x-[33%] top-0 h-1.5 rounded-full bg-neutral-600" />
          {/* Bulb */}
          <span
            className={cn(
              "absolute -bottom-3 left-1/2 size-7 -translate-x-1/2 rounded-full transition-[background-color,box-shadow] duration-300",
              on
                ? "bg-amber-100 shadow-[0_0_20px_8px_rgb(253_224_71/0.6),0_0_60px_20px_rgb(253_186_116/0.35)]"
                : "bg-neutral-300 shadow-[inset_0_-3px_4px_rgb(0_0_0/0.15)] dark:bg-neutral-600"
            )}
          />
        </span>
      </div>

      {/* Pull cord, hanging to the side of the shade. */}
      <div className="absolute top-[8.5rem] left-[calc(50%+3.25rem)] flex flex-col items-center">
        <span aria-hidden="true" className="w-px bg-neutral-400 transition-[height] duration-300 ease-out dark:bg-neutral-500" style={{ height: 64 + (pull ?? 0) }} />
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={label}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            start.current = event.clientY
            dragged.current = false
            setPull(0)
          }}
          onPointerMove={(event) => {
            if (pull === null) return
            const dy = Math.min(MAX_PULL, Math.max(0, event.clientY - start.current))
            if (dy > 4) dragged.current = true
            setPull(dy)
          }}
          onPointerUp={() => {
            if (pull !== null && pull > PULL_DISTANCE) toggle()
            setPull(null)
          }}
          onPointerCancel={() => setPull(null)}
          onClick={() => {
            // Drags are handled on pointer up; this is a plain click, tap or key press.
            if (!dragged.current) toggle()
            dragged.current = false
          }}
          className="-mt-px grid size-6 cursor-grab touch-none place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing"
        >
          <span aria-hidden="true" className="h-4 w-2.5 rounded-full bg-linear-to-b from-amber-200 to-amber-600 shadow-[0_2px_3px_rgb(0_0_0/0.3)]" />
        </button>
      </div>
    </div>
  )
}

export { PullCordLamp }
