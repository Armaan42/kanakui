"use client"

import * as React from "react"
import { CalendarPlus, Check, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EventTicket } from "@/registry/default/ui/event-ticket"

export const meta = {
  title: "Ticket order confirmation",
  description: "The event ticket on a ticket order confirmation page; tearing the stub marks it as used at the door.",
}

// Sample photo. Swap in your own. The concert, venue and buyer are made up.
const PHOTO = "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&h=320&fit=crop&auto=format&q=75"

export default function OrderConfirmation() {
  const [torn, setTorn] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check aria-hidden="true" className="size-4" />
        Order #T-58312 confirmed · sent to ana.ribeiro@example.com
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">You&apos;re going to Golden Hour Live</h1>
      <EventTicket
        className="mt-8"
        event="Golden Hour Live: Mara Lune"
        date="Sat, 14 Mar 2027"
        time="Doors 19:00"
        venue="The Engine Shed, Hall B"
        seat="Floor · General admission"
        code="GHL-0314-8842"
        image={{ src: PHOTO, alt: "A crowd with raised hands under golden stage lights" }}
        torn={torn}
        onTornChange={setTorn}
      />
      <p role="status" className="mt-4 text-sm text-muted-foreground">
        {torn ? "Scanned at the door. Enjoy the show." : "Show this at the door. Staff tear the stub when you go in."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline">
          <CalendarPlus aria-hidden="true" />
          Add to calendar
        </Button>
        <Button variant="outline">
          <MapPin aria-hidden="true" />
          Directions
        </Button>
      </div>
    </div>
  )
}
