import { BarChart3, Bell, Home, Settings, Users } from "lucide-react"

import { ScrollDevice } from "@/registry/default/ui/scroll-device"

export const meta = {
  title: "Product tour section",
  description: "The scroll device revealing an analytics dashboard as visitors scroll down a product landing page.",
}

// The product and figures are made up.
const NAV = [Home, BarChart3, Users, Bell, Settings]
const BARS = [32, 44, 38, 52, 61, 58, 70, 66, 79, 84, 81, 92]

export default function ProductTour() {
  return (
    <section className="overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">See every sign-up, trial and upgrade in one place</h2>
        <p className="mt-4 text-lg text-muted-foreground">Northlight connects to your app in ten minutes and fills in a year of history on day one.</p>
      </div>
      <ScrollDevice className="mx-auto mt-12 max-w-4xl">
        <div className="flex size-full bg-background text-[11px] sm:text-xs">
          <nav aria-label="App" className="flex w-12 flex-col items-center gap-4 border-r bg-muted/40 py-4">
            {NAV.map((Icon, i) => (
              <Icon key={i} aria-hidden="true" className={i === 1 ? "size-4" : "size-4 text-muted-foreground"} />
            ))}
          </nav>
          <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Growth</p>
              <span className="rounded-md border px-2 py-0.5 text-muted-foreground">Last 12 months</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Sign-ups", "48,210", "+12.4%"],
                ["Trials started", "9,880", "+8.1%"],
                ["Paid upgrades", "2,341", "+21.0%"],
              ].map(([label, value, change]) => (
                <div key={label} className="rounded-lg border p-2.5">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-base font-semibold tabular-nums">{value}</p>
                  <p className="text-emerald-700 dark:text-emerald-400">{change}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-lg border p-3" role="img" aria-label="Monthly sign-ups rising steadily over the year">
              {BARS.map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-foreground/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </ScrollDevice>
    </section>
  )
}
