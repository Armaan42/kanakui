"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

type LedColor = "red" | "amber" | "green" | "blue"

interface LedTickerProps extends React.ComponentProps<"div"> {
  text: string
  color?: LedColor
  /** Columns of LEDs per second. */
  speed?: number
}

const PALETTE: Record<LedColor, { on: string; glow: string; off: string }> = {
  red: { on: "#ff4d3d", glow: "rgb(255 60 40 / 0.35)", off: "#2b0d0b" },
  amber: { on: "#ffb020", glow: "rgb(255 170 20 / 0.35)", off: "#2b1d06" },
  green: { on: "#5dff7a", glow: "rgb(80 255 120 / 0.3)", off: "#0b2412" },
  blue: { on: "#5ac8ff", glow: "rgb(80 190 255 / 0.35)", off: "#0a1d2b" },
}

/** A 5×7 dot-matrix font: one string per glyph, rows split by "|", "#" for a lit LED. */
const FONT: Record<string, string> = {
  A: ".###.|#...#|#...#|#####|#...#|#...#|#...#", B: "####.|#...#|#...#|####.|#...#|#...#|####.", C: ".###.|#...#|#....|#....|#....|#...#|.###.",
  D: "####.|#...#|#...#|#...#|#...#|#...#|####.", E: "#####|#....|#....|####.|#....|#....|#####", F: "#####|#....|#....|####.|#....|#....|#....",
  G: ".###.|#...#|#....|#.###|#...#|#...#|.####", H: "#...#|#...#|#...#|#####|#...#|#...#|#...#", I: ".###.|..#..|..#..|..#..|..#..|..#..|.###.",
  J: "..###|...#.|...#.|...#.|...#.|#..#.|.##..", K: "#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#", L: "#....|#....|#....|#....|#....|#....|#####",
  M: "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#", N: "#...#|#...#|##..#|#.#.#|#..##|#...#|#...#", O: ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
  P: "####.|#...#|#...#|####.|#....|#....|#....", Q: ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#", R: "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
  S: ".####|#....|#....|.###.|....#|....#|####.", T: "#####|..#..|..#..|..#..|..#..|..#..|..#..", U: "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
  V: "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..", W: "#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.", X: "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
  Y: "#...#|#...#|.#.#.|..#..|..#..|..#..|..#..", Z: "#####|....#|...#.|..#..|.#...|#....|#####",
  "0": ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.", "1": "..#..|.##..|..#..|..#..|..#..|..#..|.###.", "2": ".###.|#...#|....#|...#.|..#..|.#...|#####",
  "3": "#####|...#.|..#..|...#.|....#|#...#|.###.", "4": "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.", "5": "#####|#....|####.|....#|....#|#...#|.###.",
  "6": "..##.|.#...|#....|####.|#...#|#...#|.###.", "7": "#####|....#|...#.|..#..|.#...|.#...|.#...", "8": ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
  "9": ".###.|#...#|#...#|.####|....#|...#.|.##..",
  " ": "...|...|...|...|...|...|...", ".": ".|.|.|.|.|.|#", ",": ".|.|.|.|.|#|#", "!": "#|#|#|#|#|.|#", "'": "#|#|.|.|.|.|.", ":": ".|.|#|.|#|.|.",
  "?": ".###.|#...#|....#|...#.|..#..|.....|..#..", "-": "...|...|...|###|...|...|...", "+": ".....|..#..|..#..|#####|..#..|..#..|.....",
  "/": "....#|...#.|...#.|..#..|.#...|.#...|#....", "&": ".##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#", "%": "##..#|##.#.|...#.|..#..|.#...|.#.##|#..##",
}

/** Turns text into columns of 7 LEDs, with a blank column between letters. */
function columnsOf(text: string) {
  const columns: boolean[][] = []
  for (const char of text.toUpperCase()) {
    const rows = (FONT[char] ?? FONT["?"]).split("|")
    for (let x = 0; x < rows[0].length; x++) columns.push(rows.map((row) => row[x] === "#"))
    columns.push(Array(7).fill(false))
  }
  return columns
}

const COLS = 72
const ROWS = 9

/**
 * A scrolling dot-matrix LED sign, like a station departure board. The text
 * loops; it can be paused, and it starts paused when reduced motion is on.
 */
function LedTicker({ text, color = "amber", speed = 14, className, ...props }: LedTickerProps) {
  const [paused, setPaused] = React.useState(false)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const offset = React.useRef(0)
  const pausedRef = React.useRef(paused)

  React.useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true)
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  React.useEffect(() => {
    const ctx = canvas.current?.getContext("2d")
    if (!ctx) return
    const pitch = 12
    const message = [...columnsOf(text), ...Array.from({ length: 24 }, () => Array(7).fill(false))]
    const colors = PALETTE[color]
    let frame = 0
    let last = performance.now()
    const draw = (now: number) => {
      // The first frame's timestamp can be a touch earlier than `last`, so never step backwards.
      if (!pausedRef.current) offset.current = (offset.current + (Math.max(0, now - last) / 1000) * speed) % message.length
      last = now
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, COLS * pitch, ROWS * pitch)
      const start = Math.floor(offset.current)
      for (let x = 0; x < COLS; x++) {
        const column = message[(((start + x) % message.length) + message.length) % message.length]
        for (let y = 0; y < ROWS; y++) {
          const lit = y > 0 && y < 8 && column[y - 1]
          const cx = x * pitch + pitch / 2
          const cy = y * pitch + pitch / 2
          if (lit) {
            ctx.fillStyle = colors.glow
            ctx.beginPath()
            ctx.arc(cx, cy, pitch * 0.62, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.fillStyle = lit ? colors.on : colors.off
          ctx.beginPath()
          ctx.arc(cx, cy, pitch * 0.36, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [text, color, speed])

  return (
    <div data-slot="led-ticker" className={cn("flex w-full max-w-3xl items-stretch gap-2", className)} {...props}>
      <div className="min-w-0 flex-1 rounded-xl bg-linear-to-b from-neutral-700 to-neutral-900 p-2 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.15)]">
        <canvas ref={canvas} width={COLS * 12} height={ROWS * 12} aria-hidden="true" className="block w-full rounded-md" />
        <p className="sr-only">{text}</p>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        aria-label="Pause the sign"
        onClick={() => setPaused(!paused)}
        className="grid w-10 shrink-0 place-items-center rounded-xl border text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
      </button>
    </div>
  )
}

export { LedTicker }
