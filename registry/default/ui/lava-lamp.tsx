"use client"

import * as React from "react"
import { Palette, Power } from "lucide-react"

import { cn } from "@/lib/utils"

type LavaColor = { name: string; wax: string; highlight: string; top: string; bottom: string }

interface LavaLampProps extends React.ComponentProps<"div"> {
  colors?: LavaColor[]
  defaultColor?: number
  defaultOn?: boolean
  onColorChange?: (color: LavaColor) => void
}

const COLORS: LavaColor[] = [
  { name: "Molten", wax: "#ff4d1a", highlight: "#ffb347", top: "#4a0d3a", bottom: "#b8205a" },
  { name: "Lagoon", wax: "#22d3ee", highlight: "#a5f3fc", top: "#0b1e4f", bottom: "#1d4ed8" },
  { name: "Lime", wax: "#a3e635", highlight: "#ecfccb", top: "#052e2b", bottom: "#0f766e" },
  { name: "Bubblegum", wax: "#f472b6", highlight: "#fbcfe8", top: "#2e1065", bottom: "#7c3aed" },
]

const GLASS = "M41 58 L79 58 L98 196 Q100 214 90 238 L30 238 Q20 214 22 196 Z"
/** Wax blobs: where they sit, how big they are, how high they rise and how long a trip takes. */
const BLOBS = [
  { x: 48, r: 13, rise: -150, drift: 6, time: 15, delay: -2 },
  { x: 70, r: 10, rise: -165, drift: -5, time: 12, delay: -7 },
  { x: 58, r: 16, rise: -110, drift: 4, time: 19, delay: -12 },
  { x: 40, r: 8, rise: -140, drift: 8, time: 11, delay: -4 },
  { x: 78, r: 9, rise: -95, drift: -6, time: 14, delay: -10 },
  { x: 62, r: 7, rise: -168, drift: -3, time: 9, delay: -1 },
]

/**
 * A rocket-shaped lava lamp. Wax blobs rise, stretch and fall back, merging
 * where they touch. Switch it off to let the wax set, or change the colour.
 */
function LavaLamp({ colors = COLORS, defaultColor = 0, defaultOn = true, onColorChange, className, ...props }: LavaLampProps) {
  const [index, setIndex] = React.useState(defaultColor)
  const [on, setOn] = React.useState(defaultOn)
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const color = colors[index % colors.length]

  return (
    <div data-slot="lava-lamp" className={cn("flex w-52 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-x-[-30%] top-[22%] bottom-[18%] rounded-full blur-3xl transition-opacity duration-1000"
          style={{ background: color.bottom, opacity: on ? 0.45 : 0 }}
        />
        <svg role="img" aria-label={`Lava lamp, ${color.name}, ${on ? "on" : "off"}`} viewBox="0 0 120 320" className="relative h-80 w-auto">
          <defs>
            <filter id={`${id}-goo`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
            <clipPath id={`${id}-glass`}>
              <path d={GLASS} />
            </clipPath>
            <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color.top} />
              <stop offset="1" stopColor={color.bottom} />
            </linearGradient>
            <linearGradient id={`${id}-wax`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={color.highlight} />
              <stop offset="0.55" stopColor={color.wax} />
              <stop offset="1" stopColor={color.wax} />
            </linearGradient>
            <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3f3f46" />
              <stop offset="0.3" stopColor="#e4e4e7" />
              <stop offset="0.55" stopColor="#71717a" />
              <stop offset="1" stopColor="#27272a" />
            </linearGradient>
          </defs>

          <g clipPath={`url(#${id}-glass)`}>
            <rect x="0" y="50" width="120" height="200" fill={`url(#${id}-liquid)`} className="transition-opacity duration-1000" opacity={on ? 1 : 0.55} />
            {/* The CSS dimming filter sits on an outer group, so it doesn't replace the goo filter. */}
            <g className="transition-[filter] duration-1000" style={{ filter: on ? "none" : "saturate(0.5) brightness(0.8)" }}>
            <g filter={`url(#${id}-goo)`} fill={`url(#${id}-wax)`}>
              <ellipse cx="60" cy="244" rx="44" ry="20" />
              {BLOBS.map((blob, i) => (
                <circle
                  key={i}
                  cx={blob.x}
                  cy={226}
                  r={blob.r}
                  className="animate-lava-lamp-rise motion-reduce:animate-none"
                  style={
                    {
                      "--rise": `${blob.rise}px`,
                      "--drift": `${blob.drift}px`,
                      animationDuration: `${blob.time}s`,
                      animationDelay: `${blob.delay}s`,
                      animationPlayState: on ? "running" : "paused",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    } as React.CSSProperties
                  }
                />
              ))}
            </g>
            </g>
          </g>
          {/* Glass shine. */}
          <path d={GLASS} fill="none" stroke="rgb(255 255 255 / 0.35)" strokeWidth="1.2" />
          <path d="M44 66 L30 196" stroke="rgb(255 255 255 / 0.4)" strokeWidth="3" strokeLinecap="round" />
          {/* Cap and base. */}
          <path d="M50 12 L70 12 L81 58 L39 58 Z" fill={`url(#${id}-metal)`} />
          <path d="M28 236 L92 236 L82 262 L106 312 Q107 318 101 318 L19 318 Q13 318 14 312 L38 262 Z" fill={`url(#${id}-metal)`} />
          <path d="M38 262 L82 262" stroke="rgb(0 0 0 / 0.35)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-pressed={on}
          aria-label="Power"
          onClick={() => setOn((value) => !value)}
          className={cn(
            "grid size-10 place-items-center rounded-full border outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
            on ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Power aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const next = (index + 1) % colors.length
            setIndex(next)
            onColorChange?.(colors[next])
          }}
          className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Palette aria-hidden="true" className="size-4" />
          <span>
            <span className="sr-only">Change colour, now </span>
            {color.name}
          </span>
        </button>
      </div>
      <p role="status" className="sr-only">
        {on ? `${color.name}, on` : "Off. The wax sets where it is."}
      </p>
    </div>
  )
}

export { LavaLamp }
export type { LavaColor }
