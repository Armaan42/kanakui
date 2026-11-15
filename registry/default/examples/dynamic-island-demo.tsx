"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Pause, Phone, PhoneOff, Play, SkipBack, SkipForward, Timer, X } from "lucide-react"

import { DynamicIsland } from "@/registry/default/ui/dynamic-island"
import { cn } from "@/lib/utils"

// Cover and portrait: Unsplash (free under the Unsplash License). Track and caller are made up.
const COVER = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=160&h=160&fit=crop&auto=format&q=80"
const CALLER = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format&q=80"

function Bars() {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-0.5">
      {[0.6, 1, 0.45, 0.85].map((peak, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-bottom rounded-full bg-fuchsia-400"
          animate={{ scaleY: [0.3, peak, 0.5, peak * 0.8, 0.3] }}
          transition={{ duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </span>
  )
}

const iconButton = "grid size-10 place-items-center rounded-full text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60"
const roundButton = "grid size-11 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"

function MusicExpanded() {
  const [playing, setPlaying] = React.useState(true)
  return (
    <div className="w-[min(22rem,calc(100vw-3rem))] p-4">
      <div className="flex items-center gap-3">
        <img src={COVER} alt="" className="size-14 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Night Drive</p>
          <p className="truncate text-sm text-white/60">The Paper Moons</p>
        </div>
        <Bars />
      </div>
      <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-white/50">
        <span>1:24</span>
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <span className="block h-full w-[38%] rounded-full bg-white" />
        </span>
        <span>-2:16</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-6">
        <button type="button" aria-label="Previous track" className={iconButton}>
          <SkipBack aria-hidden="true" className="size-5 fill-current" />
        </button>
        <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)} className={iconButton}>
          {playing ? <Pause aria-hidden="true" className="size-6 fill-current" /> : <Play aria-hidden="true" className="size-6 fill-current" />}
        </button>
        <button type="button" aria-label="Next track" className={iconButton}>
          <SkipForward aria-hidden="true" className="size-5 fill-current" />
        </button>
      </div>
    </div>
  )
}

const VIEWS = {
  Music: {
    label: "Now playing: Night Drive by The Paper Moons",
    compact: (
      <span className="flex h-9 w-56 items-center justify-between px-2">
        <img src={COVER} alt="" className="size-6 rounded-md" />
        <Bars />
      </span>
    ),
    expanded: <MusicExpanded />,
  },
  Timer: {
    label: "Timer: 4 minutes 59 seconds left",
    compact: (
      <span className="flex h-9 w-44 items-center justify-between px-3 text-orange-400">
        <Timer aria-hidden="true" className="size-4" />
        <span className="font-mono text-sm tabular-nums">4:59</span>
      </span>
    ),
    expanded: (
      <div className="flex w-[min(20rem,calc(100vw-3rem))] items-center justify-between gap-4 p-4">
        <div className="flex gap-2">
          <button type="button" aria-label="Pause timer" className={cn(roundButton, "bg-orange-500/25 text-orange-300")}>
            <Pause aria-hidden="true" className="size-5 fill-current" />
          </button>
          <button type="button" aria-label="Cancel timer" className={cn(roundButton, "bg-white/15")}>
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-orange-300">Pasta</p>
          <p className="font-mono text-3xl font-light text-orange-400 tabular-nums">4:59</p>
        </div>
      </div>
    ),
  },
  Call: {
    label: "Incoming call from Sofie Lindqvist",
    compact: (
      <span className="flex h-9 w-48 items-center justify-between px-2">
        <img src={CALLER} alt="" className="size-6 rounded-full" />
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
          <Phone aria-hidden="true" className="size-3.5 fill-current" /> Incoming
        </span>
      </span>
    ),
    expanded: (
      <div className="flex w-[min(22rem,calc(100vw-3rem))] items-center gap-3 p-4">
        <img src={CALLER} alt="" className="size-12 rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white/60">mobile</p>
          <p className="truncate font-semibold">Sofie Lindqvist</p>
        </div>
        <button type="button" aria-label="Decline" className={cn(roundButton, "bg-red-500")}>
          <PhoneOff aria-hidden="true" className="size-5" />
        </button>
        <button type="button" aria-label="Accept" className={cn(roundButton, "bg-emerald-500")}>
          <Phone aria-hidden="true" className="size-5 fill-current" />
        </button>
      </div>
    ),
  },
}

type Mode = keyof typeof VIEWS

export default function DynamicIslandDemo() {
  const [mode, setMode] = React.useState<Mode>("Music")
  const view = VIEWS[mode]

  return (
    <div className="flex min-h-72 w-full flex-col items-center gap-10">
      <DynamicIsland key={mode} label={view.label} compact={view.compact} expanded={view.expanded} />
      <div role="group" aria-label="Island content" className="mt-auto flex gap-0.5 rounded-lg border p-0.5 text-xs">
        {(Object.keys(VIEWS) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn("rounded-md px-3 py-1", mode === m ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground")}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}
