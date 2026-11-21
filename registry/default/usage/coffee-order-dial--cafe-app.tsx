"use client"

import * as React from "react"
import { Check, Clock, MapPin } from "lucide-react"

import { CoffeeOrderDial } from "@/registry/default/ui/coffee-order-dial"

export const meta = {
  title: "Café ordering app",
  description: "The coffee order dial as the main screen of a café's order-ahead app, with pickup details and a confirmation.",
}

// The café and pickup times are made up.
export default function CafeApp() {
  const [ordered, setOrdered] = React.useState<string | null>(null)

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <p className="text-sm text-muted-foreground">Kiln Corner Café</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Order ahead</h1>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin aria-hidden="true" className="size-3.5" />
          Rua das Flores 12
        </span>
        <span className="flex items-center gap-1">
          <Clock aria-hidden="true" className="size-3.5" />
          Ready in about 6 min
        </span>
      </p>
      <div className="mt-8">
        <CoffeeOrderDial currency="EUR" locale="pt-PT" onOrder={(order) => setOrdered(`${order.size.toLowerCase()} ${order.drink.toLowerCase()}`)} />
      </div>
      {ordered ? (
        <p role="status" className="mt-6 flex items-center gap-2 rounded-xl border p-4 text-sm">
          <Check aria-hidden="true" className="size-4" />
          Your {ordered} is in the queue. We&apos;ll text you when it&apos;s on the counter.
        </p>
      ) : null}
    </div>
  )
}
