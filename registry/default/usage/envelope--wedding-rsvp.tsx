"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Envelope } from "@/registry/default/ui/envelope"

export const meta = {
  title: "Wedding RSVP page",
  description: "The envelope holding a wedding invitation on an RSVP page; once opened, guests can reply below it.",
}

// The couple, venue and guest are made up.
export default function WeddingRsvp() {
  const [reply, setReply] = React.useState<"yes" | "no" | null>(null)

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">An invitation for Maya Okafor</p>
      <Envelope className="mt-8" label="Open the invitation" to="Maya">
        <p className="font-serif text-2xl">Lena &amp; Tomás</p>
        <p className="mt-2 text-sm">are getting married on Saturday 12 June 2027 at the old boathouse by the river, Porto.</p>
        <p className="mt-2 text-sm">Ceremony at 16:00, dinner and dancing after.</p>
      </Envelope>
      <section aria-labelledby="rsvp" className="mt-10 w-full rounded-xl border bg-card p-6">
        <h1 id="rsvp" className="font-medium">
          Will you be there?
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Please reply by 1 April.</p>
        {reply ? (
          <p role="status" className="mt-4 flex items-center justify-center gap-2 text-sm">
            <Check aria-hidden="true" className="size-4" />
            {reply === "yes" ? "Wonderful. See you in Porto!" : "Thanks for letting us know. You'll be missed."}
          </p>
        ) : (
          <div className="mt-4 flex justify-center gap-3">
            <Button onClick={() => setReply("yes")}>Joyfully accept</Button>
            <Button variant="outline" onClick={() => setReply("no")}>
              Regretfully decline
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
