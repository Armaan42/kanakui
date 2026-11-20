"use client"

import * as React from "react"
import { Map as MapIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface FoldingMapProps extends React.ComponentProps<"div"> {
  /** On the cover. */
  title?: string
  subtitle?: string
  /** The map itself, drawn in a 600 × 400 SVG coordinate space. */
  children?: React.ReactNode
}

/** A made-up harbour town, drawn for the default map. */
function HarbourTown() {
  return (
    <>
      <rect width="600" height="400" fill="#f4ecd8" />
      <path d="M0 0H118C96 80 142 140 110 200C88 262 150 300 128 342C200 362 300 332 400 360C480 380 560 360 600 372V400H0Z" fill="#a9d4e4" />
      <path d="M600 40C520 70 500 120 430 140C360 160 330 220 300 260C280 300 300 330 290 352" fill="none" stroke="#9fcde0" strokeWidth="12" strokeLinecap="round" />
      <path d="M180 60C230 40 290 60 300 100C310 140 250 160 210 150C170 140 150 90 180 60Z" fill="#c9e0b4" />
      <path d="M440 230C480 210 540 230 545 270C550 310 500 320 470 310C440 300 420 250 440 230Z" fill="#c9e0b4" />
      <g fill="none" strokeLinecap="round">
        {[
          "M120 120C200 130 300 120 420 100C480 90 540 100 600 110",
          "M140 250C220 240 300 250 380 230C450 215 520 220 600 230",
          "M250 0C255 80 240 160 260 240C270 290 250 330 240 350",
          "M400 0C390 70 410 160 380 230",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke="#d6cbb2" strokeWidth="9" />
            <path d={d} stroke="#ffffff" strokeWidth="6" />
          </g>
        ))}
      </g>
      <path d="M300 258L330 252" stroke="#7c6f57" strokeWidth="6" />
      {[
        { x: 128, y: 60, name: "Lighthouse" },
        { x: 262, y: 186, name: "Old Market" },
        { x: 395, y: 110, name: "Station" },
        { x: 480, y: 262, name: "Museum" },
        { x: 200, y: 318, name: "Harbour" },
      ].map((place) => (
        <g key={place.name}>
          <path d={`M${place.x} ${place.y}c-6-8-9-12-9-16a9 9 0 0 1 18 0c0 4-3 8-9 16z`} fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
          <text x={place.x + 12} y={place.y - 12} fontSize="13" fontWeight="600" fill="#3f3a2e" fontFamily="system-ui, sans-serif">
            {place.name}
          </text>
        </g>
      ))}
      <text x="220" y="105" fontSize="11" fill="#4d7c0f" fontStyle="italic" fontFamily="system-ui, sans-serif">
        Hill Park
      </text>
      <text x="40" y="250" fontSize="14" fill="#2b6f8a" fontStyle="italic" fontFamily="Georgia, serif" transform="rotate(-70 40 250)">
        North Sound
      </text>
      <g transform="translate(548 52)">
        <circle r="24" fill="#fffaf0" stroke="#3f3a2e" strokeWidth="1" />
        <path d="M0-20L5 0L0 20L-5 0Z" fill="#3f3a2e" />
        <path d="M0-20L5 0L-5 0Z" fill="#dc2626" />
        <text y="-27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3f3a2e" fontFamily="system-ui, sans-serif">
          N
        </text>
      </g>
    </>
  )
}

const PANELS = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  { col: 0, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
]
/** At each step, how far to shift the map so the folded part sits in the middle. */
const SHIFT = ["translate(33.333%, 25%)", "translate(16.667%, 25%)", "translate(0, 25%)", "translate(0, 0)"]

/**
 * A paper map that unfolds panel by panel: the cover opens out, then the
 * right-hand panel, then the bottom half drops down. Fold it back the same way.
 */
function FoldingMap({ title = "Port Haven", subtitle = "Walking map", children, className, ...props }: FoldingMapProps) {
  const [step, setStep] = React.useState(0)
  const [busy, setBusy] = React.useState(false)
  const timers = React.useRef<number[]>([])
  const art = children ?? <HarbourTown />

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const run = (to: number) => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (still) return setStep(to)
    setBusy(true)
    const direction = to > step ? 1 : -1
    let at = step
    let delay = 0
    while (at !== to) {
      at += direction
      const value = at
      timers.current.push(window.setTimeout(() => setStep(value), delay))
      delay += 650
    }
    timers.current.push(window.setTimeout(() => setBusy(false), delay))
  }

  // Which step reveals each panel: the first column is always there.
  const revealAt = (col: number, row: number) => (row === 1 ? 3 : col)

  return (
    <div data-slot="folding-map" className={cn("flex w-full max-w-2xl flex-col gap-4", className)} {...props}>
      <div className="relative aspect-[3/2] w-full [perspective:1800px] motion-reduce:[&_*]:transition-none!">
        {/* Shifted to centre the folded part; it overhangs the button below, so it must not catch clicks. */}
        <div className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-in-out motion-reduce:transition-none [transform-style:preserve-3d]" style={{ transform: SHIFT[step] }}>
          {PANELS.map(({ col, row }) => {
            const reveal = revealAt(col, row)
            const open = step >= reveal
            // Folded panels sit a hair in front of the one they cover, so the two never flicker.
            const fold = row === 1 ? "rotateX(180deg) translateZ(-1px)" : "rotateY(-180deg) translateZ(-1px)"
            // The cover panel always shows; the others appear when it's their turn to swing out,
            // and stay visible until they've folded away again (visibility waits for the turn).
            const shown = reveal <= 1 || open
            return (
              <div
                key={`${col}-${row}`}
                className={cn("absolute h-1/2 w-1/3 [transform-style:preserve-3d]", row === 1 ? "origin-top" : "origin-left", !shown && "invisible")}
                style={{
                  left: `${(col * 100) / 3}%`,
                  top: `${row * 50}%`,
                  transform: open ? "none" : fold,
                  transition: "transform 650ms ease-in-out, visibility 650ms",
                }}
              >
                {/* Front: this panel's piece of the map. */}
                <div className="absolute inset-0 overflow-hidden shadow-[0_6px_14px_-6px_rgb(0_0_0/0.35)] [backface-visibility:hidden]">
                  <svg viewBox={`${col * 200} ${row * 200} 200 200`} preserveAspectRatio="none" className="size-full" role={col === 0 && row === 0 ? "img" : undefined} aria-label={col === 0 && row === 0 ? `Map of ${title}` : undefined} aria-hidden={col === 0 && row === 0 ? undefined : true}>
                    {art}
                  </svg>
                  <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", row === 1 ? "bg-linear-to-b from-black/10 to-transparent to-15%" : "bg-linear-to-r from-black/10 to-transparent to-10%")} />
                </div>
                {/* Back: plain paper, except the cover on the panel that folds over the first. */}
                <div
                  aria-hidden="true"
                  className={cn("absolute inset-0 flex flex-col justify-between p-[8%] [backface-visibility:hidden]", col === 1 && row === 0 ? "bg-emerald-900 text-emerald-50" : "bg-[#efe6d0]")}
                  style={{ transform: row === 1 ? "rotateX(180deg)" : "rotateY(180deg)" }}
                >
                  {col === 1 && row === 0 ? (
                    <>
                      <MapIcon className="size-6 opacity-80 sm:size-8" />
                      <div>
                        <p className="font-serif text-lg leading-tight font-bold sm:text-2xl">{title}</p>
                        <p className="mt-1 text-[10px] tracking-[0.2em] uppercase opacity-80 sm:text-xs">{subtitle}</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => run(step === 3 ? 0 : 3)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
        >
          {step === 3 ? "Fold it up" : "Unfold the map"}
        </button>
      </div>
      <p role="status" className="sr-only">
        {step === 3 ? `The map of ${title} is open.` : step === 0 ? "The map is folded." : "Unfolding…"}
      </p>
    </div>
  )
}

export { FoldingMap }
