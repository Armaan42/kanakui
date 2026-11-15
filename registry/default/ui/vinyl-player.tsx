"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface VinylPlayerProps extends React.ComponentProps<"div"> {
  /** Album cover, shown as the record's center label. */
  cover: { src: string; alt: string }
  title: string
  artist: string
  /** Controlled playing state. */
  playing?: boolean
  defaultPlaying?: boolean
  onPlayingChange?: (playing: boolean) => void
  /** Seconds per turn. A real 33⅓ rpm record takes 1.8. */
  speed?: number
}

/**
 * A turntable. Press play (or the record) and the tonearm swings onto the
 * record and it spins; the highlight on the grooves stays put, like light
 * catching a real record. With reduced motion the record doesn't spin.
 */
function VinylPlayer({
  cover,
  title,
  artist,
  playing: playingProp,
  defaultPlaying = false,
  onPlayingChange,
  speed = 1.8,
  className,
  ...props
}: VinylPlayerProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultPlaying)
  const playing = playingProp ?? uncontrolled

  const toggle = () => {
    setUncontrolled(!playing)
    onPlayingChange?.(!playing)
  }

  return (
    <div
      data-slot="vinyl-player"
      data-playing={playing || undefined}
      className={cn("group/vinyl w-full max-w-md select-none", className)}
      {...props}
    >
      {/* Plinth */}
      <div className="relative aspect-[5/4] rounded-[6%/7.5%] bg-linear-to-br from-neutral-100 to-neutral-300 p-[5%] shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_30px_60px_-30px_rgb(0_0_0/0.45),0_0_0_1px_rgb(0_0_0/0.06)] dark:from-neutral-800 dark:to-neutral-900 dark:shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_30px_60px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.06)]">
        {/* Platter + record: a button, so a click on the record also plays. */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title}` : `Play ${title} by ${artist}`}
          aria-pressed={playing}
          className="absolute top-[7%] left-[5%] aspect-square h-[86%] cursor-pointer rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {/* Platter rim */}
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-neutral-400 shadow-[inset_0_2px_4px_rgb(0_0_0/0.35)] dark:bg-neutral-700" />
          {/* The record: grooves, label and spindle hole spin together. */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-[3%] animate-spin rounded-full motion-reduce:animate-none",
              "bg-[repeating-radial-gradient(circle,#111_0,#111_1px,#1c1c1c_1.6px,#111_2.4px)] shadow-[0_6px_14px_rgb(0_0_0/0.45)]"
            )}
            style={{ animationDuration: `${speed}s`, animationPlayState: playing ? "running" : "paused" }}
          >
            <span className="absolute inset-[33%] overflow-hidden rounded-full ring-4 ring-black/40">
              <img src={cover.src} alt="" className="size-full object-cover" draggable={false} />
            </span>
            <span className="absolute top-1/2 left-1/2 size-[3%] -translate-1/2 rounded-full bg-neutral-300 ring-1 ring-black/50" />
          </span>
          {/* Light on the grooves: doesn't turn with the record. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[3%] rounded-full bg-[conic-gradient(from_200deg,transparent_0deg,rgb(255_255_255/0.16)_25deg,transparent_55deg,transparent_180deg,rgb(255_255_255/0.1)_205deg,transparent_235deg)] [mask-image:radial-gradient(circle,transparent_33%,black_34%)]"
          />
        </button>

        {/* Tonearm: pivots at the top right and swings onto the record while playing. */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[9%] right-[9%] size-[13%]">
          <span className="absolute inset-0 rounded-full bg-linear-to-br from-neutral-200 to-neutral-400 shadow-[0_3px_6px_rgb(0_0_0/0.35)] dark:from-neutral-500 dark:to-neutral-700" />
          <span className="absolute inset-[30%] rounded-full bg-neutral-500 dark:bg-neutral-400" />
          <span
            className={cn(
              "absolute top-1/2 left-1/2 h-[560%] w-[12%] origin-top -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)] motion-reduce:transition-none",
              playing ? "rotate-[27deg]" : "rotate-[4deg] group-hover/vinyl:rotate-[9deg]"
            )}
          >
            <span className="absolute inset-x-0 top-0 bottom-[14%] rounded-full bg-linear-to-r from-neutral-300 via-neutral-100 to-neutral-400 shadow-[2px_3px_5px_rgb(0_0_0/0.35)] dark:from-neutral-500 dark:via-neutral-300 dark:to-neutral-600" />
            {/* Headshell */}
            <span className="absolute bottom-0 left-1/2 h-[18%] w-[260%] -translate-x-1/2 rotate-[-18deg] rounded-[3px] bg-neutral-700 shadow-[2px_3px_5px_rgb(0_0_0/0.4)] dark:bg-neutral-950" />
          </span>
        </div>

        {/* Controls */}
        <div className="absolute right-[6%] bottom-[7%] flex flex-col items-end gap-2">
          <span aria-hidden="true" className="flex gap-1 font-mono text-[10px] text-neutral-500">
            <span className={cn("rounded px-1", !playing && "text-neutral-400")}>33</span>
            <span className="rounded px-1 text-neutral-400">45</span>
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-10 place-items-center rounded-full bg-neutral-900 text-white shadow-[0_2px_0_rgb(0_0_0/0.3),0_6px_12px_-4px_rgb(0_0_0/0.5)] transition-transform outline-none active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {playing ? <Pause aria-hidden="true" className="size-4 fill-current" /> : <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />}
          </button>
        </div>

        {/* Power light */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-[7%] left-[5%] size-1.5 rounded-full transition-colors",
            playing ? "bg-emerald-500 shadow-[0_0_6px_1px_rgb(16_185_129/0.7)]" : "bg-neutral-400 dark:bg-neutral-600"
          )}
        />
      </div>

      {/* Now playing */}
      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="truncate text-sm text-muted-foreground">{artist}</p>
        </div>
        <p aria-live="polite" className="shrink-0 text-xs text-muted-foreground">
          {playing ? "Now playing" : "Paused"}
        </p>
      </div>
      {/* The cover's description, kept with the player for screen readers. */}
      <span className="sr-only">{cover.alt}</span>
    </div>
  )
}

export { VinylPlayer }
