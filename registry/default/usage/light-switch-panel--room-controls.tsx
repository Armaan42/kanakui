"use client"

import * as React from "react"

import { LightSwitchPanel } from "@/registry/default/ui/light-switch-panel"

export const meta = {
  title: "Room lighting controls",
  description: "The light switch panel in a smart-home app's kitchen screen, with the energy use updating as lights go on and off.",
}

// The home and wattages are made up.
const WATTS: Record<string, number> = { pendant: 24, counter: 18, pantry: 9 }

export default function RoomControls() {
  const [on, setOn] = React.useState<string[]>(["pendant", "counter"])
  const watts = on.reduce((sum, id) => sum + (WATTS[id] ?? 0), 0)

  return (
    <div className="mx-auto grid max-w-3xl items-center gap-10 px-6 py-12 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Oakline Home</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Kitchen</h1>
        <p role="status" className="mt-4 text-4xl font-semibold tabular-nums">
          {watts} W
        </p>
        <p className="text-sm text-muted-foreground">
          {on.length} of 3 lights on · about €{((watts / 1000) * 0.22 * 5).toFixed(2)} for a 5-hour evening
        </p>
      </div>
      <LightSwitchPanel
        value={on}
        onValueChange={setOn}
        switches={[
          { id: "pendant", label: "Pendant" },
          { id: "counter", label: "Counter" },
          { id: "pantry", label: "Pantry" },
        ]}
      />
    </div>
  )
}
