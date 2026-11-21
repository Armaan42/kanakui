"use client"

import * as React from "react"

import { MusicEqualizer } from "@/registry/default/ui/music-equalizer"
import { ToggleSwitch } from "@/registry/default/ui/toggle-switch"

export const meta = {
  title: "Headphone sound settings",
  description: "The equalizer in a headphones companion app's sound settings, next to the other listening options.",
}

// The product and settings are made up.
export default function AudioSettings() {
  const [anc, setAnc] = React.useState(true)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Field Headphones · connected</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Sound</h1>
      <section aria-labelledby="eq" className="mt-8">
        <h2 id="eq" className="font-medium">
          Equalizer
        </h2>
        <p className="text-sm text-muted-foreground">Changes apply to every app on this phone.</p>
        <MusicEqualizer className="mt-4" />
      </section>
      <ul className="mt-8 divide-y rounded-xl border bg-card text-sm">
        <li className="flex items-center justify-between gap-4 p-4">
          <span>
            <span id="anc-label" className="block font-medium">
              Noise cancelling
            </span>
            <span className="text-muted-foreground">{anc ? "On · adapts to the room" : "Off"}</span>
          </span>
          <ToggleSwitch aria-labelledby="anc-label" checked={anc} onCheckedChange={setAnc} />
        </li>
        <li className="flex items-center justify-between gap-4 p-4">
          <span>
            <span className="block font-medium">Battery</span>
            <span className="text-muted-foreground">72% · about 29 hours left</span>
          </span>
        </li>
      </ul>
    </div>
  )
}
