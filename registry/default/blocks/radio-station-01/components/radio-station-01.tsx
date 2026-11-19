"use client"

import * as React from "react"

import { RadioTuner, type RadioStation } from "@/registry/default/ui/radio-tuner"

// The stations and shows are made up.
const STATIONS: (RadioStation & { schedule: [string, string][] })[] = [
  { frequency: 89.7, name: "Night Owl", genre: "Late-night jazz", schedule: [["22:00", "Blue Notes with Ada"], ["00:00", "The Long Set"], ["03:00", "Before Dawn"]] },
  { frequency: 94.2, name: "Coastline", genre: "Indie and folk", schedule: [["18:00", "Tidewater"], ["20:00", "Live from the Pier"], ["22:00", "Slow Songs"]] },
  { frequency: 99.5, name: "Signal", genre: "News and talk", schedule: [["18:00", "The Evening Report"], ["19:00", "Ask an Expert"], ["21:00", "World Desk"]] },
  { frequency: 104.8, name: "Pulse", genre: "Electronic", schedule: [["20:00", "Warm-Up"], ["22:00", "Club Hours"], ["02:00", "Afterglow"]] },
]

/** A community radio page: tune the dial and the station's schedule appears. */
export function RadioStation01() {
  const [station, setStation] = React.useState<(typeof STATIONS)[number] | null>(null)

  return (
    <section aria-labelledby="radio-station-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="radio-station-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Four stations, one dial
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">Turn the knob to find a station and see what’s on tonight.</p>
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <RadioTuner
            stations={STATIONS}
            defaultFrequency={93.1}
            onTune={(_, tuned) => setStation(STATIONS.find((s) => s.name === tuned?.name) ?? null)}
            className="max-w-none"
          />
          <div aria-live="polite" className="rounded-2xl border bg-card p-6 text-card-foreground">
            {station ? (
              <>
                <p className="font-mono text-xs text-muted-foreground">{station.frequency.toFixed(1)} FM</p>
                <h3 className="mt-1 text-xl font-semibold">{station.name}</h3>
                <p className="text-sm text-muted-foreground">{station.genre}</p>
                <ol className="mt-5 divide-y border-y">
                  {station.schedule.map(([time, show]) => (
                    <li key={time} className="flex gap-4 py-2.5 text-sm">
                      <span className="w-12 font-mono text-muted-foreground tabular-nums">{time}</span>
                      <span>{show}</span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Between stations. Keep turning.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
