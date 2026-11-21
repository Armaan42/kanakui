"use client"

import * as React from "react"
import { Lock, Snowflake } from "lucide-react"

import { HoloCard } from "@/registry/default/ui/holo-card"
import { ToggleSwitch } from "@/registry/default/ui/toggle-switch"

export const meta = {
  title: "Card settings",
  description: "The holo card at the top of a banking app's card settings, with freeze and limit controls below.",
}

// The bank, card and limits are made up.
export default function CardSettings() {
  const [frozen, setFrozen] = React.useState(false)
  const [online, setOnline] = React.useState(true)

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Your card</h1>
      <p className="mt-1 text-sm text-muted-foreground">Click the card to see the back.</p>
      <div className={frozen ? "mt-6 opacity-50 grayscale transition" : "mt-6 transition"}>
        <HoloCard name="Ana Ribeiro" last4="4821" expires="08/29" brand="Brightwater" className="w-full" />
      </div>
      <ul className="mt-8 divide-y rounded-xl border bg-card text-sm">
        <li className="flex items-center justify-between gap-4 p-4">
          <span className="flex items-center gap-3">
            <Snowflake aria-hidden="true" className="size-4 text-muted-foreground" />
            <span>
              <span id="freeze-label" className="block font-medium">
                Freeze card
              </span>
              <span className="text-muted-foreground">{frozen ? "Frozen. Payments are declined." : "Pause it if you can't find it."}</span>
            </span>
          </span>
          <ToggleSwitch aria-labelledby="freeze-label" checked={frozen} onCheckedChange={setFrozen} />
        </li>
        <li className="flex items-center justify-between gap-4 p-4">
          <span className="flex items-center gap-3">
            <Lock aria-hidden="true" className="size-4 text-muted-foreground" />
            <span>
              <span id="online-label" className="block font-medium">
                Online payments
              </span>
              <span className="text-muted-foreground">Up to €1,500 a day</span>
            </span>
          </span>
          <ToggleSwitch aria-labelledby="online-label" checked={online && !frozen} disabled={frozen} onCheckedChange={setOnline} />
        </li>
      </ul>
    </div>
  )
}
