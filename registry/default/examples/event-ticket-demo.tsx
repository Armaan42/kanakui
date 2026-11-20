"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { EventTicket } from "@/registry/default/ui/event-ticket"

// Photo: Unsplash (free under the Unsplash License). The event is made up.
export default function EventTicketDemo() {
  const [ticket, setTicket] = React.useState(0)
  const [torn, setTorn] = React.useState(false)

  return (
    <div className="flex w-[min(34rem,calc(100vw-2rem))] flex-col items-center gap-5">
      <EventTicket
        key={ticket}
        onTornChange={setTorn}
        event="Golden Hour Live: Mara Lune"
        date="Sat, 14 Mar 2026"
        time="Doors 19:00"
        venue="The Roundhouse, Hall B"
        seat="Floor · General admission"
        code="GHL-0314-8842"
        image={{
          src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&h=320&fit=crop&auto=format&q=75",
          alt: "A crowd with raised hands under golden stage lights",
        }}
      />
      <p className="flex items-center gap-3 text-sm text-muted-foreground">
        {torn ? "Enjoy the show!" : null}
        {torn ? (
          <button
            type="button"
            onClick={() => {
              setTicket((n) => n + 1)
              setTorn(false)
            }}
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:text-foreground"
          >
            <RotateCcw aria-hidden="true" className="size-3" /> New ticket
          </button>
        ) : null}
      </p>
    </div>
  )
}
