"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { WeatherWidget } from "@/registry/default/ui/weather-widget"
import { WorldClock } from "@/registry/default/ui/world-clock"

// Cover: Unsplash (free under the Unsplash License). Track, events and reminders are made up.
const COVER = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=200&h=200&fit=crop&auto=format&q=80"

const ZONES = [
  { city: "London", timeZone: "Europe/London" },
  { city: "New York", timeZone: "America/New_York" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
]

const events = [
  { time: "10:00", title: "Design review", color: "bg-violet-500" },
  { time: "13:00", title: "Lunch with Marcus", color: "bg-emerald-500" },
  { time: "16:30", title: "Dentist", color: "bg-sky-500" },
]

const tile = "rounded-[1.75rem] border bg-card p-5 shadow-sm"

/** A home-screen style grid of widgets: weather, world clocks, music, calendar and reminders. */
export function Widgets01() {
  const [playing, setPlaying] = React.useState(true)
  const [done, setDone] = React.useState<Record<string, boolean>>({ "Water the plants": true })
  const reminders = ["Water the plants", "Send the invoice", "Call Mum", "Renew passport"]

  return (
    <section aria-labelledby="widgets-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="widgets-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Good morning, Priya
        </h2>
        <p className="mt-2 text-muted-foreground">Here’s your day at a glance.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <WeatherWidget
            className="max-w-none sm:row-span-2"
            city="Lisbon"
            condition="sunny"
            temperature={24}
            high={27}
            low={17}
            summary="Sunny and warm"
            forecast={[
              { day: "Tue", condition: "sunny", high: 27, low: 17 },
              { day: "Wed", condition: "cloudy", high: 23, low: 16 },
              { day: "Thu", condition: "rain", high: 18, low: 13 },
              { day: "Fri", condition: "cloudy", high: 21, low: 14 },
              { day: "Sat", condition: "sunny", high: 25, low: 16 },
            ]}
          />

          <section aria-label="World clock" className={cn(tile, "flex items-center justify-center sm:col-span-1 lg:col-span-2")}>
            <WorldClock zones={ZONES} className="gap-4 [&>li]:w-24" />
          </section>

          <section aria-label="Now playing" className={cn(tile, "flex flex-col")}>
            <div className="flex items-center gap-3">
              <img src={COVER} alt="" className="size-14 rounded-xl" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Night Drive</p>
                <p className="truncate text-sm text-muted-foreground">The Paper Moons</p>
              </div>
            </div>
            <div className="mt-auto pt-5">
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[38%] rounded-full bg-foreground" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">1:24 / 3:40</span>
                <button
                  type="button"
                  aria-label={playing ? "Pause Night Drive" : "Play Night Drive"}
                  onClick={() => setPlaying(!playing)}
                  className="grid size-9 place-items-center rounded-full bg-foreground text-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {playing ? <Pause aria-hidden="true" className="size-4 fill-current" /> : <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />}
                </button>
              </div>
            </div>
          </section>

          <section aria-label="Today's calendar" className={tile}>
            <p className="text-xs font-semibold tracking-widest text-red-500 uppercase">Monday</p>
            <p className="text-4xl font-light tabular-nums">16</p>
            <ul className="mt-3 space-y-2">
              {events.map((e) => (
                <li key={e.title} className="flex items-center gap-2.5 text-sm">
                  <span aria-hidden="true" className={cn("h-8 w-1 rounded-full", e.color)} />
                  <span>
                    <span className="block font-medium">{e.title}</span>
                    <span className="block text-xs text-muted-foreground">{e.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Reminders" className={cn(tile, "sm:col-span-2 lg:col-span-2")}>
            <p className="text-sm font-semibold">
              Reminders <span className="font-normal text-muted-foreground">· {reminders.filter((r) => !done[r]).length} left</span>
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {reminders.map((r) => (
                <li key={r}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(done[r])}
                      onChange={() => setDone((d) => ({ ...d, [r]: !d[r] }))}
                      className="size-4 accent-orange-500"
                    />
                    <span className={cn(done[r] && "text-muted-foreground line-through")}>{r}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
