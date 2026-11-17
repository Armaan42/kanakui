"use client"

import * as React from "react"

import { SplitFlap } from "@/registry/default/ui/split-flap"

// A departures board that updates every few seconds. Flights are made up.
const BOARDS = [
  [
    ["TOKYO", "09:40", "BOARDING"],
    ["LISBON", "10:15", "ON TIME"],
    ["NAIROBI", "10:55", "DELAYED"],
  ],
  [
    ["SEOUL", "11:20", "GATE 14"],
    ["REYKJAVIK", "11:45", "ON TIME"],
    ["SYDNEY", "12:30", "BOARDING"],
  ],
]

export default function SplitFlapDemo() {
  const [board, setBoard] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setBoard((b) => (b + 1) % BOARDS.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div tabIndex={0} role="region" aria-label="Departures board" className="w-full max-w-2xl overflow-x-auto rounded-2xl bg-neutral-950 p-4 shadow-xl sm:p-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
      <div className="mb-3 flex gap-6 font-mono text-[10px] tracking-[0.2em] text-amber-400/80 uppercase sm:text-xs">
        <span className="w-[9.6em] sm:w-[12em]">Destination</span>
        <span className="w-[5.3em] sm:w-[6.5em]">Time</span>
        <span>Status</span>
      </div>
      <div className="flex flex-col gap-2">
        {BOARDS[board].map(([city, time, status], row) => (
          <div key={row} className="flex gap-3 sm:gap-4">
            <SplitFlap value={city} length={9} className="text-sm sm:text-xl" />
            <SplitFlap value={time} length={5} className="text-sm sm:text-xl" />
            <SplitFlap value={status} length={8} className="text-sm text-amber-300 sm:text-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
