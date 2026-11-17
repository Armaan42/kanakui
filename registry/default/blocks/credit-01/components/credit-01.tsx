import { TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScoreGauge } from "@/registry/default/ui/score-gauge"

const factors = [
  { name: "Payment history", value: "100% on time", rating: "Excellent", level: 1, impact: "High impact" },
  { name: "Credit usage", value: "8% of $12,500", rating: "Excellent", level: 0.95, impact: "High impact" },
  { name: "Account age", value: "6 yrs 4 mos", rating: "Good", level: 0.7, impact: "Medium impact" },
  { name: "Hard enquiries", value: "2 in 2 years", rating: "Fair", level: 0.5, impact: "Low impact" },
]

const ratingColor: Record<string, string> = {
  Excellent: "bg-emerald-500",
  Good: "bg-lime-500",
  Fair: "bg-amber-500",
  Poor: "bg-red-500",
}

const history = [698, 705, 712, 721, 730, 742]

/** A credit score card: the gauge, the factors behind the score, and the trend. */
export function Credit01() {
  const min = Math.min(...history) - 10
  const max = Math.max(...history) + 10
  const points = history.map((v, i) => `${(i / (history.length - 1)) * 100},${40 - ((v - min) / (max - min)) * 36}`).join(" ")

  return (
    <section aria-labelledby="credit-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="credit-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Your credit health
        </h2>
        <p className="mt-2 text-muted-foreground">Checking your score here never affects it.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col items-center rounded-3xl border bg-card p-6 sm:p-8">
            <ScoreGauge value={742} label="Credit score" caption="Updated 2 Nov" />
            <div className="mt-6 w-full rounded-2xl bg-muted/50 p-4">
              <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <TrendingUp aria-hidden="true" className="size-4" /> +44 points in 6 months
              </p>
              <svg viewBox="0 0 100 42" preserveAspectRatio="none" role="img" aria-label={`Score over six months: ${history.join(", ")}`} className="mt-3 h-12 w-full overflow-visible">
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" className="text-emerald-500" />
              </svg>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>Jun</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <h3 className="font-semibold">What’s shaping your score</h3>
            <ul className="mt-5 space-y-5">
              {factors.map((f) => (
                <li key={f.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-sm font-medium">{f.name}</span>
                    <span className="text-sm text-muted-foreground">{f.value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", ratingColor[f.rating])} style={{ width: `${f.level * 100}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{f.rating}</span> · {f.impact}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-dashed p-4 text-sm">
              <p className="font-medium">Tip: keep usage under 10%</p>
              <p className="mt-1 text-muted-foreground">You’re at 8%. Paying your card before the statement date keeps it there.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
