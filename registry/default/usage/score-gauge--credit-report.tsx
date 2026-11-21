import { ScoreGauge } from "@/registry/default/ui/score-gauge"

export const meta = {
  title: "Credit report",
  description: "The score gauge at the top of a personal finance app's credit report, with the factors behind the score.",
}

// The app, person and figures are made up.
const FACTORS = [
  { name: "Payment history", value: "100% on time", impact: "High", rating: "Excellent" },
  { name: "Credit usage", value: "8% of €12,500", impact: "High", rating: "Excellent" },
  { name: "Account age", value: "6 years 4 months", impact: "Medium", rating: "Good" },
  { name: "Hard enquiries", value: "2 in the last 2 years", impact: "Low", rating: "Fair" },
]

export default function CreditReport() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Brightwater Money · updated 18 Nov</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your credit score</h1>
      <div className="mt-6 rounded-xl border bg-card p-6">
        <ScoreGauge value={742} label="Credit score" caption="Up 12 points since last month" className="mx-auto max-w-xs" />
      </div>
      <section aria-labelledby="factors" className="mt-6">
        <h2 id="factors" className="font-medium">
          What makes up your score
        </h2>
        <ul className="mt-3 divide-y rounded-xl border bg-card text-sm">
          {FACTORS.map((factor) => (
            <li key={factor.name} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
              <span>
                <span className="font-medium">{factor.name}</span>
                <span className="block text-muted-foreground">
                  {factor.value} · {factor.impact} impact
                </span>
              </span>
              <span className="rounded-full border px-2.5 py-0.5 text-xs">{factor.rating}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
