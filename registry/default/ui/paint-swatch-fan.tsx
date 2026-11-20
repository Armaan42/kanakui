"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

type Shade = { name: string; hex: string }

interface PaintSwatchFanProps extends React.ComponentProps<"div"> {
  /** Strips of shades, light to dark. */
  strips?: Shade[][]
  onColorChange?: (hex: string) => void
}

// Paint names are made up.
const STRIPS: Shade[][] = [
  [{ name: "Shell Pink", hex: "#fde2e4" }, { name: "Rosehip", hex: "#f9a8b4" }, { name: "Coral Reef", hex: "#f2727f" }, { name: "Pillar Box", hex: "#d1343e" }, { name: "Claret", hex: "#7f1d2b" }],
  [{ name: "Apricot Milk", hex: "#feead6" }, { name: "Marmalade", hex: "#fdba74" }, { name: "Fox", hex: "#f08a3c" }, { name: "Rust", hex: "#c2551c" }, { name: "Conker", hex: "#7c3414" }],
  [{ name: "Buttercup", hex: "#fef7cd" }, { name: "Lemon Curd", hex: "#fde68a" }, { name: "Mustard", hex: "#e8b931" }, { name: "Ochre", hex: "#b88516" }, { name: "Old Brass", hex: "#6f5110" }],
  [{ name: "Pea Shoot", hex: "#e3f5d8" }, { name: "Sage", hex: "#a9cf9a" }, { name: "Fern", hex: "#5fa05a" }, { name: "Racing", hex: "#2f6d3a" }, { name: "Forest Floor", hex: "#1b3d24" }],
  [{ name: "Sea Glass", hex: "#d5f2ee" }, { name: "Lagoon", hex: "#7fd3c8" }, { name: "Teal", hex: "#2c9c92" }, { name: "Peacock", hex: "#16655f" }, { name: "Deep Water", hex: "#0c3b38" }],
  [{ name: "Cloud", hex: "#dfecfb" }, { name: "Cornflower", hex: "#93bdf0" }, { name: "Harbour", hex: "#3f7fd0" }, { name: "Admiral", hex: "#1f4d96" }, { name: "Midnight", hex: "#14264e" }],
  [{ name: "Lilac Mist", hex: "#ede4fb" }, { name: "Wisteria", hex: "#c3a8ee" }, { name: "Violet", hex: "#8c5fd6" }, { name: "Plum", hex: "#5b338f" }, { name: "Aubergine", hex: "#33194f" }],
  [{ name: "Chalk", hex: "#f5f3ee" }, { name: "Pebble", hex: "#cfcac0" }, { name: "Slate", hex: "#8b8a86" }, { name: "Graphite", hex: "#4e4d4b" }, { name: "Coal", hex: "#232322" }],
]

/** Black or white label text, whichever contrasts more with the swatch (WCAG relative luminance). */
const ink = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return (luminance + 0.05) / 0.0573 > 1.05 / (luminance + 0.05) ? "#1c1917" : "#ffffff"
}

/**
 * A paint swatch fan deck as a colour picker. Fan the strips out, pick a
 * shade, and copy its hex. Arrow keys move between shades and strips.
 */
function PaintSwatchFan({ strips = STRIPS, onColorChange, className, ...props }: PaintSwatchFanProps) {
  const [open, setOpen] = React.useState(true)
  const [picked, setPicked] = React.useState<[number, number]>([5, 2])
  const [focus, setFocus] = React.useState<[number, number]>([5, 2])
  const [copied, setCopied] = React.useState(false)
  const fan = React.useRef<HTMLDivElement>(null)
  const shade = strips[picked[0]][picked[1]]
  const spread = 110 / Math.max(strips.length - 1, 1)

  const pick = (strip: number, index: number) => {
    setPicked([strip, index])
    setFocus([strip, index])
    setCopied(false)
    onColorChange?.(strips[strip][index].hex)
  }

  const move = (strip: number, index: number) => {
    const target: [number, number] = [(strip + strips.length) % strips.length, Math.min(4, Math.max(0, index))]
    setFocus(target)
    fan.current?.querySelector<HTMLButtonElement>(`[data-shade="${target[0]}-${target[1]}"]`)?.focus()
  }

  return (
    <div data-slot="paint-swatch-fan" className={cn("flex w-full max-w-md flex-col gap-4", className)} {...props}>
      <div ref={fan} role="group" aria-label="Paint swatches. Arrow keys move between shades." className="relative h-72 overflow-hidden rounded-2xl bg-muted/40 sm:h-80">
        {strips.map((strip, s) => {
          const angle = open ? -55 + s * spread : -4 + s * 1.2
          return (
            <div
              key={s}
              className="absolute bottom-6 left-1/2 flex h-52 w-12 origin-[50%_calc(100%-12px)] flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_14px_-6px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-[cubic-bezier(.3,1.3,.5,1)] motion-reduce:transition-none sm:h-64 sm:w-14"
              style={{ transform: `translateX(-50%) rotate(${angle}deg)`, transitionDelay: `${(open ? s : strips.length - s) * 30}ms`, zIndex: s }}
            >
              {strip.map((item, i) => (
                <button
                  key={item.hex}
                  type="button"
                  data-shade={`${s}-${i}`}
                  tabIndex={focus[0] === s && focus[1] === i ? 0 : -1}
                  aria-label={`${item.name}, ${item.hex}`}
                  aria-pressed={picked[0] === s && picked[1] === i}
                  onClick={() => pick(s, i)}
                  onFocus={() => setFocus([s, i])}
                  onKeyDown={(event) => {
                    const moves: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
                    const by = moves[event.key]
                    if (!by) return
                    event.preventDefault()
                    move(s + by[0], i + by[1])
                  }}
                  className="relative flex-1 outline-none focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-sky-500 focus-visible:ring-inset aria-pressed:ring-3 aria-pressed:ring-inset"
                  style={{ background: item.hex, color: ink(item.hex) }}
                >
                  <span className="absolute bottom-0.5 left-1 hidden max-w-[90%] truncate text-[7px] font-semibold sm:block">{item.name}</span>
                </button>
              ))}
              <span aria-hidden="true" className="h-6 shrink-0 bg-white" />
            </div>
          )
        })}
        <span aria-hidden="true" className="absolute bottom-7 left-1/2 z-50 size-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#737373)] shadow" />
      </div>

      <div className="flex items-center gap-3">
        <span className="size-14 shrink-0 rounded-xl border shadow-inner" style={{ background: shade.hex }} />
        <div className="min-w-0 flex-1">
          <p className="font-medium">{shade.name}</p>
          <p className="font-mono text-sm text-muted-foreground uppercase">{shade.hex}</p>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shade.hex)
              setCopied(true)
            } catch {
              setCopied(false)
            }
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
          {copied ? "Copied" : "Copy hex"}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-pressed={open}
          onClick={() => setOpen(!open)}
          className="h-9 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {open ? "Close the fan" : "Fan it out"}
        </button>
        <p role="status" className="text-sm text-muted-foreground">
          {copied ? `Copied ${shade.hex}` : `${shade.name} picked`}
        </p>
      </div>
    </div>
  )
}

export { PaintSwatchFan }
