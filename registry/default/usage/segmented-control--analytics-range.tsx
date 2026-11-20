"use client"

import * as React from "react"

import { SegmentedControl } from "@/registry/default/ui/segmented-control"

export const meta = {
  title: "Analytics date range",
  description: "A segmented control switching an analytics card between 7, 30 and 90 days; the chart and totals update with it.",
}

// The figures are made up.
const DATA: Record<string, { total: string; change: string; bars: number[] }> = {
  "7d": { total: "4,812", change: "+6.2%", bars: [52, 61, 48, 70, 66, 84, 77] },
  "30d": { total: "19,406", change: "+11.8%", bars: [40, 46, 44, 52, 58, 55, 61, 64, 60, 68, 72, 70, 78, 81, 76] },
  "90d": { total: "54,930", change: "+23.4%", bars: [30, 34, 33, 38, 41, 45, 47, 52, 55, 60, 63, 66, 70, 74, 79, 83, 86, 90] },
}

export default function AnalyticsRange() {
  const [range, setRange] = React.useState("30d")
  const data = DATA[range]

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section aria-labelledby="visitors" className="rounded-xl border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 id="visitors" className="text-sm text-muted-foreground">
              Unique visitors
            </h2>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{data.total}</p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">{data.change} vs. previous period</p>
          </div>
          <SegmentedControl
            label="Date range"
            value={range}
            onValueChange={setRange}
            options={[
              { value: "7d", label: "7 days" },
              { value: "30d", label: "30 days" },
              { value: "90d", label: "90 days" },
            ]}
          />
        </div>
        <div className="mt-8 flex h-40 items-end gap-1.5" role="img" aria-label={`Bar chart of visitors over ${range.replace("d", " days")}, trending up`}>
          {data.bars.map((height, index) => (
            <span key={`${range}-${index}`} className="flex-1 rounded-t bg-foreground/80 transition-[height] duration-300" style={{ height: `${height}%` }} />
          ))}
        </div>
      </section>
    </div>
  )
}
