"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Characters each flap can show, in the order it flips through them. */
const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/!?"

interface SplitFlapProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Text to show. It's padded or cut to `length`. Unknown characters show as spaces. */
  value: string
  /** Number of flaps. Defaults to the value's length. */
  length?: number
  /** Milliseconds per flip. Each flap flips through the charset until it reaches its letter. */
  speed?: number
  charset?: string
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)")
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

/** Half of a character: the top or bottom half of a full-size glyph, clipped. */
function Half({ char, half, className, style }: { char: string; half: "top" | "bottom"; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={cn(
        "absolute inset-x-0 h-1/2 overflow-hidden bg-neutral-900 backface-hidden",
        half === "top" ? "top-0 origin-bottom rounded-t-[inherit]" : "bottom-0 origin-top rounded-b-[inherit]",
        half === "top" ? "bg-linear-to-b from-neutral-800 to-neutral-900" : "bg-linear-to-b from-neutral-900 to-neutral-950",
        className
      )}
      style={style}
    >
      <span className={cn("absolute inset-x-0 flex h-[200%] items-center justify-center", half === "top" ? "top-0" : "bottom-0")}>{char}</span>
    </span>
  )
}

function Flap({ target, charset, speed, reduced }: { target: string; charset: string; speed: number; reduced: boolean }) {
  const [current, setCurrent] = React.useState(target)
  const [previous, setPrevious] = React.useState(target)
  const [flip, setFlip] = React.useState(0)

  React.useEffect(() => {
    if (reduced) {
      const id = setTimeout(() => {
        setPrevious(target)
        setCurrent(target)
      }, 0)
      return () => clearTimeout(id)
    }
    if (current === target) return
    const id = setTimeout(() => {
      const index = charset.indexOf(current)
      const next = charset[(index + 1) % charset.length] ?? target
      setPrevious(current)
      setCurrent(next)
      setFlip((n) => n + 1)
    }, speed)
    return () => clearTimeout(id)
  }, [current, target, charset, speed, reduced])

  return (
    <span className="relative inline-block h-[1.5em] w-[1.05em] rounded-[0.12em] text-neutral-100 shadow-[0_2px_4px_rgb(0_0_0/0.35)] perspective-[300px]">
      {/* Static halves: the new top and the old bottom. */}
      <Half char={current} half="top" />
      <Half char={previous} half="bottom" />
      {/* Flaps: the old top falls, then the new bottom lands. */}
      {flip > 0 && !reduced ? (
        <React.Fragment key={flip}>
          <Half char={previous} half="top" style={{ animation: `split-flap-top ${speed * 0.5}ms ease-in forwards` }} />
          <Half
            char={current}
            half="bottom"
            className="[transform:rotateX(90deg)]"
            style={{ animation: `split-flap-bottom ${speed * 0.5}ms ease-out ${speed * 0.5}ms forwards` }}
          />
        </React.Fragment>
      ) : null}
      {/* The hinge line across the middle. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-px bg-black/70" />
    </span>
  )
}

/**
 * A split-flap display, like an airport departures board. When `value`
 * changes, each flap flips through the characters to its new letter.
 * Screen readers get the text itself; with reduced motion it switches
 * without flipping.
 */
function SplitFlap({ value, length, speed = 70, charset = DEFAULT_CHARSET, className, ...props }: SplitFlapProps) {
  const reduced = useReducedMotion()
  const size = length ?? value.length
  const text = value.toUpperCase().padEnd(size, " ").slice(0, size)
  const chars = [...text].map((c) => (charset.includes(c) ? c : " "))

  return (
    <div data-slot="split-flap" className={cn("inline-flex gap-[0.08em] font-mono text-3xl leading-none font-semibold", className)} {...props}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex gap-[0.08em]">
        {chars.map((c, i) => (
          <Flap key={i} target={c} charset={charset} speed={speed} reduced={reduced} />
        ))}
      </span>
    </div>
  )
}

export { SplitFlap }
