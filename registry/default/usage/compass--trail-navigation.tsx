"use client"

import * as React from "react"

import { Compass } from "@/registry/default/ui/compass"

export const meta = {
  title: "Trail navigation",
  description: "The compass in a hiking app, telling you which way to turn to face the next waypoint.",
}

// The trail and waypoint are made up.
const BEARING = 72

function turnHint(heading: number) {
  const diff = ((BEARING - heading + 540) % 360) - 180
  if (Math.abs(diff) <= 10) return "You're facing the hut. Keep going."
  return `Turn ${Math.abs(Math.round(diff))}° ${diff > 0 ? "right" : "left"} to face the hut.`
}

export default function TrailNavigation() {
  const [heading, setHeading] = React.useState(0)

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Compass defaultHeading={0} onHeadingChange={setHeading} className="mx-auto" />
      <div>
        <p className="text-sm text-muted-foreground">Oakline Trails · Serra ridge loop</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Next: Pedra Alta hut</h1>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-y py-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Bearing</dt>
            <dd className="mt-1 font-medium tabular-nums">{BEARING}° ENE</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Distance</dt>
            <dd className="mt-1 font-medium tabular-nums">2.4 km</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Climb</dt>
            <dd className="mt-1 font-medium tabular-nums">310 m</dd>
          </div>
        </dl>
        <p role="status" className="mt-4 font-medium">
          {turnHint(heading)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Drag the dial, or allow motion access on your phone to use its compass.</p>
      </div>
    </div>
  )
}
