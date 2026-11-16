"use client"

import * as React from "react"
import { CalendarDays, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { EventTicket } from "@/registry/default/ui/event-ticket"

// Photos: Unsplash (free under the Unsplash License). The festival and artists are made up.
const BACKDROP = "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1800&h=1100&fit=crop&auto=format&q=70"
const TICKET_PHOTO = "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&h=320&fit=crop&auto=format&q=75"

const days = [
  {
    id: "sat",
    label: "Saturday",
    date: "14 March",
    sets: [
      { time: "16:00", artist: "The Paper Moons", stage: "Garden" },
      { time: "17:30", artist: "Ola & the Tides", stage: "Hall B" },
      { time: "19:15", artist: "Kestrel Sound System", stage: "Garden" },
      { time: "21:00", artist: "Mara Lune", stage: "Main stage", headline: true },
    ],
  },
  {
    id: "sun",
    label: "Sunday",
    date: "15 March",
    sets: [
      { time: "15:30", artist: "Fernway Choir", stage: "Hall B" },
      { time: "17:00", artist: "Neon Orchard", stage: "Garden" },
      { time: "18:45", artist: "Juniper Static", stage: "Main stage" },
      { time: "20:45", artist: "Glass Harbour", stage: "Main stage", headline: true },
    ],
  },
]

/** A festival section over a photo: dates, the lineup by day (tabs), and a ticket. Dark in both themes. */
export function Event01() {
  const [active, setActive] = React.useState(0)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const baseId = React.useId()

  const select = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  return (
    <section aria-labelledby={`${baseId}-title`} className="dark relative isolate overflow-hidden bg-background text-foreground">
      <img src={BACKDROP} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/80 via-black/75 to-black/90" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <p className="text-sm font-medium text-amber-300">Two days · four stages · one riverside venue</p>
          <h2 id={`${baseId}-title`} className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Golden Hour Festival
          </h2>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4" /> 14–15 March 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4" /> The Roundhouse, London
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Festival days"
            className="mt-10 inline-flex rounded-lg border border-white/15 bg-white/5 p-1 backdrop-blur"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") select((active + 1) % days.length)
              if (event.key === "ArrowLeft") select((active - 1 + days.length) % days.length)
            }}
          >
            {days.map((day, index) => (
              <button
                key={day.id}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${day.id}`}
                aria-selected={active === index}
                aria-controls={`${baseId}-panel`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active === index ? "bg-white text-neutral-900" : "text-white/70 hover:text-white"
                )}
              >
                {day.label} <span className="font-normal opacity-60">{day.date}</span>
              </button>
            ))}
          </div>

          <ol id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${days[active].id}`} className="mt-6 space-y-2">
            {days[active].sets.map((set) => (
              <li
                key={set.artist}
                className={cn(
                  "flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur",
                  set.headline && "border-amber-300/40 bg-amber-300/10"
                )}
              >
                <span className="w-12 font-mono text-sm text-white/60 tabular-nums">{set.time}</span>
                <span className="flex-1 font-medium">
                  {set.artist}
                  {set.headline ? <span className="ml-2 rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-semibold text-neutral-900 uppercase">Headliner</span> : null}
                </span>
                <span className="text-sm text-white/60">{set.stage}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-center gap-4">
          <EventTicket
            event="Golden Hour Festival: weekend pass"
            date="14–15 Mar 2026"
            time="Gates 14:00"
            venue="The Roundhouse, London"
            seat="Weekend · All stages"
            code="GHF-WKND-2026"
            image={{ src: TICKET_PHOTO, alt: "A crowd with raised hands under golden stage lights" }}
          />
          <p className="text-sm text-white/60">Weekend passes from £89 · Drag the stub to tear it off</p>
        </div>
      </div>
    </section>
  )
}
