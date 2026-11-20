import { Database, Gauge, HardDrive, Zap } from "lucide-react"

import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

export const meta = {
  title: "Usage dashboard",
  description: "Spotlight cards as the usage meters of a developer dashboard, each with its limit and reset date.",
}

// The plan and usage are made up.
const METERS = [
  { icon: Zap, label: "API requests", used: 12480, limit: 50000, unit: "" },
  { icon: Database, label: "Database rows", used: 820000, limit: 1000000, unit: "" },
  { icon: HardDrive, label: "File storage", used: 3.2, limit: 10, unit: " GB" },
  { icon: Gauge, label: "Build minutes", used: 412, limit: 500, unit: " min" },
]

export default function UsageDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usage</h1>
          <p className="mt-1 text-sm text-muted-foreground">Oakline · Team plan · resets on 1 December</p>
        </div>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {METERS.map(({ icon: Icon, label, used, limit, unit }) => {
          const percent = Math.round((used / limit) * 100)
          const high = percent >= 80
          return (
            <li key={label}>
              <SpotlightCard className="p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
                  {used.toLocaleString("en-US")}
                  {unit} <span className="text-base font-normal text-muted-foreground">of {limit.toLocaleString("en-US")}{unit}</span>
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted" role="img" aria-label={`${percent}% used`}>
                  <div className={high ? "h-full rounded-full bg-amber-600" : "h-full rounded-full bg-foreground"} style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{high ? `${percent}% used. Consider upgrading before the reset.` : `${percent}% used`}</p>
              </SpotlightCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
