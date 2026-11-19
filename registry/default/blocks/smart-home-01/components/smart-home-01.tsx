"use client"

import * as React from "react"
import { Zap } from "lucide-react"

import { LightSwitchPanel } from "@/registry/default/ui/light-switch-panel"
import { Thermostat } from "@/registry/default/ui/thermostat"

const LIGHTS = [
  { id: "living", label: "Living", defaultOn: true },
  { id: "kitchen", label: "Kitchen" },
  { id: "hall", label: "Hall", defaultOn: true },
  { id: "porch", label: "Porch" },
]
const WATTS = 9
const INSIDE = 19

/** A smart-home panel: the thermostat, the light switches and what they're using right now. */
export function SmartHome01() {
  const [target, setTarget] = React.useState(21)
  const [lights, setLights] = React.useState(LIGHTS.filter((light) => light.defaultOn).map((light) => light.id))
  const heating = target > INSIDE + 0.4
  const usage = lights.length * WATTS + (heating ? Math.round((target - INSIDE) * 180) : 0)

  return (
    <section aria-labelledby="smart-home-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Home · Tuesday evening</p>
            <h2 id="smart-home-01-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome home
            </h2>
          </div>
          <p aria-live="polite" className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
            <Zap aria-hidden="true" className="size-4 text-amber-500" />
            Using <span className="font-mono font-medium tabular-nums">{usage} W</span> now
          </p>
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-card-foreground">
            <h3 className="self-start text-sm font-medium text-muted-foreground">Climate</h3>
            <Thermostat defaultValue={target} current={INSIDE} onValueChange={setTarget} />
            <p className="text-sm text-muted-foreground">{heating ? `Warming the house by ${(target - INSIDE).toFixed(1)}°` : "Holding steady"}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border bg-card p-8 text-card-foreground">
            <h3 className="text-sm font-medium text-muted-foreground">Lights</h3>
            <LightSwitchPanel switches={LIGHTS} value={lights} onValueChange={setLights} className="mx-auto max-w-lg" />
            <p className="text-center text-sm text-muted-foreground">
              {lights.length} of {LIGHTS.length} on · about {lights.length * WATTS} W
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
