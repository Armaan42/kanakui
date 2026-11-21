"use client"

import * as React from "react"

import { ServiceBell } from "@/registry/default/ui/service-bell"

export const meta = {
  title: "Hotel reception kiosk",
  description: "The service bell on a small hotel's self check-in screen, ringing for someone at the desk when a guest needs help.",
}

// The hotel and staff are made up.
export default function HotelReception() {
  const [rang, setRang] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">Casa Tidewell · Reception</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Welcome. Checking in?</h1>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        Scan the QR code from your booking email to get your room key. If you need a hand, ring the bell and someone will come down.
      </p>
      <ServiceBell className="mx-auto mt-10" label="Ring for reception" sound={false} onRing={() => setRang(true)} />
      <p role="status" className="mt-6 text-sm text-muted-foreground">
        {rang ? "Joana has been told. She'll be with you in a minute or two." : "The desk is staffed from 8am to 11pm."}
      </p>
    </div>
  )
}
