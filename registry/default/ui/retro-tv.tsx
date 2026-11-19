"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TvChannel {
  src: string
  alt: string
  name: string
}

interface RetroTvProps extends React.ComponentProps<"div"> {
  channels: TvChannel[]
  defaultChannel?: number
  onChannelChange?: (index: number) => void
}

/**
 * A wood-cased CRT set. Turn the channel knob (click, drag or arrow keys) and
 * the picture breaks into static before the next channel tunes in. The power
 * button collapses the picture to a line, like the real thing.
 */
function RetroTv({ channels, defaultChannel = 0, onChannelChange, className, ...props }: RetroTvProps) {
  const [channel, setChannel] = React.useState(defaultChannel)
  const [on, setOn] = React.useState(true)
  const [tuning, setTuning] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const current = channels[channel]

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const tune = (next: number) => {
    const index = (next + channels.length) % channels.length
    setChannel(index)
    onChannelChange?.(index)
    setTuning(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setTuning(false), 420)
  }

  return (
    <div data-slot="retro-tv" className={cn("w-full max-w-md", className)} {...props}>
      <svg aria-hidden="true" className="absolute size-0">
        <filter id={`${id}-static`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="1">
            <animate attributeName="seed" values="1;5;9;3;7;2;8" dur="0.35s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="flex gap-3 rounded-2xl bg-[linear-gradient(90deg,#7c4a24,#9a5f30_40%,#6b3d1c)] p-3 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.65),inset_0_1px_0_rgb(255_255_255/0.2)]">
        {/* Screen */}
        <div className="relative aspect-[4/3] min-w-0 flex-1 overflow-hidden rounded-[22%/18%] bg-neutral-950 shadow-[inset_0_0_0_6px_#262626,inset_0_0_30px_rgb(0_0_0/0.9)]">
          <div className={cn("absolute inset-2 overflow-hidden rounded-[20%/16%] transition-[transform,opacity] duration-500 motion-reduce:transition-none", on ? "scale-100 opacity-100" : "scale-x-90 scale-y-[0.005] opacity-0")}>
            <img src={current.src} alt={current.alt} className="size-full object-cover saturate-[1.15]" />
            {tuning ? <span aria-hidden="true" className="absolute inset-0 bg-neutral-500" style={{ filter: `url(#${id}-static)` }} /> : null}
            <span aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.22)_0_1px,transparent_1px_3px)]" />
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.55))]" />
            <span aria-hidden="true" className="absolute top-[6%] left-[8%] h-1/4 w-1/3 -rotate-12 rounded-full bg-white/10 blur-md" />
            <span aria-live="polite" className="absolute top-[8%] right-[10%] font-mono text-sm font-bold text-lime-300 drop-shadow-[0_0_4px_rgb(190_242_100/0.8)]">
              {on ? `CH ${String(channel + 1).padStart(2, "0")}` : ""}
            </span>
          </div>
        </div>
        {/* Controls */}
        <div className="flex w-16 shrink-0 flex-col items-center justify-between rounded-lg bg-neutral-900/80 py-3">
          <button
            type="button"
            role="slider"
            aria-label="Channel"
            aria-valuemin={1}
            aria-valuemax={channels.length}
            aria-valuenow={channel + 1}
            aria-valuetext={`Channel ${channel + 1}, ${current.name}`}
            onClick={() => tune(channel + 1)}
            onKeyDown={(event) => {
              const step = event.key === "ArrowUp" || event.key === "ArrowRight" ? 1 : event.key === "ArrowDown" || event.key === "ArrowLeft" ? -1 : 0
              if (!step) return
              event.preventDefault()
              tune(channel + step)
            }}
            className="relative size-12 rounded-full bg-[conic-gradient(#525252,#a3a3a3,#404040,#d4d4d4,#525252)] shadow-[0_3px_6px_rgb(0_0_0/0.6)] outline-none transition-[rotate] duration-200 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none"
            style={{ rotate: `${(channel / channels.length) * 360}deg` }}
          >
            <span aria-hidden="true" className="absolute top-1 left-1/2 h-3 w-1 -translate-x-1/2 rounded-full bg-neutral-100" />
          </button>
          <div aria-hidden="true" className="space-y-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="block h-0.5 w-8 rounded-full bg-neutral-700" />
            ))}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Power"
            onClick={() => setOn(!on)}
            className={cn("size-5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/60", on ? "bg-red-500 shadow-[0_0_8px_2px_rgb(239_68_68/0.6)]" : "bg-neutral-600")}
          />
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">{on ? current.name : "Off"}</p>
    </div>
  )
}

export { RetroTv }
