"use client"

import * as React from "react"

import { LabelMaker } from "@/registry/default/ui/label-maker"

export const meta = {
  title: "Warehouse shelf labels",
  description: "The label maker in a small shop's stock room tool, printing shelf labels and keeping a list of what's been printed.",
}

// The shop, bins and tape colours are made up.
const TAPES = [
  { name: "Black on yellow", color: "#facc15" },
  { name: "White on blue", color: "#2563eb" },
  { name: "White on red", color: "#dc2626" },
]

export default function WarehouseShelves() {
  const [printed, setPrinted] = React.useState<string[]>([])

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Ceramics · Stock room</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Label the new shelving</h1>
        <p className="mt-2 text-muted-foreground">Use the bin code, then the product. Yellow for glazes, blue for clay, red for anything fragile.</p>
        <LabelMaker
          className="mt-8"
          defaultText="A3 · STONEWARE"
          tapes={TAPES}
          sound={false}
          onLabel={(text) => setPrinted((list) => [text, ...list])}
        />
      </div>
      <aside aria-labelledby="printed">
        <h2 id="printed" className="text-sm font-medium">
          Printed today
        </h2>
        <ul className="mt-2 divide-y border-y text-sm">
          {printed.length === 0 ? (
            <li className="py-3 text-muted-foreground">Nothing printed yet.</li>
          ) : (
            printed.map((text, i) => (
              <li key={`${printed.length - i}`} className="py-3 font-mono">
                {text}
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  )
}
