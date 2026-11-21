"use client"

import * as React from "react"
import { Droplets, Leaf, Wind } from "lucide-react"

import { Thermostat } from "@/registry/default/ui/thermostat"

export const meta = {
  title: "Smart home heating",
  description: "The thermostat on a smart-home app's heating screen, with the schedule and an energy estimate that follow the target.",
}

// The home, readings and costs are made up.
export default function SmartHome() {
  const [target, setTarget] = React.useState(21)
  const cost = (0.42 + (target - 18) * 0.11).toFixed(2)

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-2">
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">Living room</p>
        <Thermostat className="mt-4" defaultValue={21} current={19.5} min={10} max={28} onValueChange={setTarget} />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Heating</h1>
        <p className="mt-1 text-sm text-muted-foreground">Oakline Home · 2 rooms on</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border p-3">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Droplets aria-hidden="true" className="size-3.5" />
              Humidity
            </dt>
            <dd className="mt-1 font-medium">48%</dd>
          </div>
          <div className="rounded-xl border p-3">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Wind aria-hidden="true" className="size-3.5" />
              Outside
            </dt>
            <dd className="mt-1 font-medium">9°</dd>
          </div>
          <div className="rounded-xl border p-3">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Leaf aria-hidden="true" className="size-3.5" />
              Today
            </dt>
            <dd className="mt-1 font-medium tabular-nums">€{cost}</dd>
          </div>
        </dl>
        <h2 className="mt-8 text-sm font-medium">Schedule</h2>
        <ul className="mt-2 divide-y rounded-xl border text-sm">
          <li className="flex justify-between px-4 py-2.5">
            <span>Wake up · 06:30</span>
            <span className="tabular-nums">{target}°</span>
          </li>
          <li className="flex justify-between px-4 py-2.5">
            <span>Away · 08:30</span>
            <span className="tabular-nums">16°</span>
          </li>
          <li className="flex justify-between px-4 py-2.5">
            <span>Evening · 17:30</span>
            <span className="tabular-nums">{target}°</span>
          </li>
          <li className="flex justify-between px-4 py-2.5">
            <span>Night · 23:00</span>
            <span className="tabular-nums">17°</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
