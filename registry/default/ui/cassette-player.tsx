"use client"

import * as React from "react"
import { Pause, Play, Rewind } from "lucide-react"

import { cn } from "@/lib/utils"

interface CassettePlayerProps extends React.ComponentProps<"div"> {
  title: string
  artist: string
  /** Track length in seconds. */
  duration?: number
  /** e.g. "A" or "B". */
  side?: string
  /** Label stripe color: any CSS color. */
  accent?: string
  playing?: boolean
  defaultPlaying?: boolean
  onPlayingChange?: (playing: boolean) => void
}

const HANDWRITING = '"Segoe Print", "Bradley Hand", "Marker Felt", "Chalkboard SE", cursive'
const TICK = 250

const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`

/** A reel: the tape wound on it (sized by how much it holds) and a toothed hub. */
function Reel({ amount, spinning }: { amount: number; spinning: boolean }) {
  // The tape pack grows from just around the hub (0) to nearly the window edge (1).
  const pack = 48 + amount * 46
  return (
    <span className="relative grid aspect-square w-[24%] place-items-center">
      <span
        aria-hidden="true"
        className="absolute rounded-full bg-[radial-gradient(circle,#4a2f1f_0%,#2b1a10_70%,#3a2416_100%)] transition-[width,height] duration-300"
        style={{ width: `${pack}%`, height: `${pack}%` }}
      />
      <span
        aria-hidden="true"
        className="relative grid size-[44%] animate-spin place-items-center rounded-full bg-neutral-100 shadow-[0_0_0_2px_rgb(0_0_0/0.25)] motion-reduce:animate-none"
        style={{ animationDuration: "2.4s", animationPlayState: spinning ? "running" : "paused" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <span key={angle} className="absolute h-[22%] w-[12%] rounded-sm bg-neutral-100" style={{ transform: `rotate(${angle}deg) translateY(-155%)` }} />
        ))}
        <span className="size-[46%] rounded-full bg-neutral-800" />
      </span>
    </span>
  )
}

/**
 * A cassette tape. Press play and both reels turn while the tape winds from
 * one reel to the other. It plays no audio: connect `onPlayingChange` to
 * your own player.
 */
function CassettePlayer({
  title,
  artist,
  duration = 214,
  side = "A",
  accent = "oklch(0.72 0.17 35)",
  playing: playingProp,
  defaultPlaying = false,
  onPlayingChange,
  className,
  ...props
}: CassettePlayerProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultPlaying)
  const playing = playingProp ?? uncontrolled
  const [elapsed, setElapsedState] = React.useState(0)
  const elapsedRef = React.useRef(0)
  const setElapsed = (value: number) => {
    elapsedRef.current = value
    setElapsedState(value)
  }

  const setPlaying = React.useCallback(
    (next: boolean) => {
      setUncontrolled(next)
      onPlayingChange?.(next)
    },
    [onPlayingChange]
  )

  React.useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      const next = elapsedRef.current + TICK / 1000
      if (next >= duration) {
        elapsedRef.current = 0
        setElapsedState(0)
        setPlaying(false)
      } else {
        elapsedRef.current = next
        setElapsedState(next)
      }
    }, TICK)
    return () => clearInterval(id)
  }, [playing, duration, setPlaying])

  const progress = elapsed / duration

  return (
    <div data-slot="cassette-player" className={cn("@container flex w-full max-w-md flex-col items-center gap-5 select-none", className)} {...props}>
      {/* Shell */}
      <div
        className="relative aspect-[1.6] w-full rounded-[4%/6.5%] bg-linear-to-b from-neutral-800 to-neutral-900 p-[4%] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_24px_40px_-20px_rgb(0_0_0/0.6)]"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        {/* Corner screws */}
        {["top-[3%] left-[2.2%]", "top-[3%] right-[2.2%]", "bottom-[3%] left-[2.2%]", "bottom-[3%] right-[2.2%]"].map((pos) => (
          <span key={pos} aria-hidden="true" className={cn("absolute size-[2.4%] rounded-full bg-neutral-500 shadow-inner", pos)} />
        ))}

        {/* Label */}
        <div className="relative flex h-[72%] flex-col overflow-hidden rounded-[3%/5%] bg-[#f3eee2] px-[5%] pt-[3%] text-neutral-800">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-[clamp(0.9rem,4.4cqw,1.35rem)] leading-tight" style={{ fontFamily: HANDWRITING }}>
              {title}
            </p>
            <span className="shrink-0 font-mono text-[clamp(0.65rem,2.6cqw,0.85rem)] font-bold">SIDE {side}</span>
          </div>
          <p className="truncate text-[clamp(0.7rem,3cqw,0.95rem)] text-neutral-600" style={{ fontFamily: HANDWRITING }}>
            {artist}
          </p>
          {/* Stripes */}
          <span aria-hidden="true" className="mt-[2%] h-[7%] bg-(--accent)" />
          <span aria-hidden="true" className="mt-[1.5%] h-[4%] bg-(--accent) opacity-60" />
          {/* Window with the reels */}
          <div aria-hidden="true" className="mx-auto mt-[4%] flex h-[46%] w-[78%] items-center justify-between rounded-full bg-neutral-900/90 px-[6%] shadow-[inset_0_2px_6px_rgb(0_0_0/0.6)]">
            <Reel amount={1 - progress} spinning={playing} />
            <span className="h-[2px] flex-1 bg-[#3a2416]" />
            <Reel amount={progress} spinning={playing} />
          </div>
        </div>

        {/* Bottom edge with the tape guides */}
        <div aria-hidden="true" className="absolute inset-x-[18%] bottom-0 h-[18%] bg-neutral-700 [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]">
          <span className="absolute top-[35%] left-[18%] size-[18%] rounded-full bg-neutral-900" />
          <span className="absolute top-[35%] right-[18%] size-[18%] rounded-full bg-neutral-900" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full items-center justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="truncate text-sm text-muted-foreground">{artist}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {time(elapsed)} / {time(duration)}
          </span>
          <button
            type="button"
            aria-label="Rewind"
            onClick={() => setElapsed(0)}
            className="grid size-9 place-items-center rounded-full border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Rewind aria-hidden="true" className="size-4 fill-current" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : `Play ${title}`}
            onClick={() => setPlaying(!playing)}
            className="grid size-10 place-items-center rounded-full bg-foreground text-background outline-none hover:bg-foreground/90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {playing ? <Pause aria-hidden="true" className="size-4 fill-current" /> : <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export { CassettePlayer }
