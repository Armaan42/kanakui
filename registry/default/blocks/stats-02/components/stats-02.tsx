import { ProgressRing } from "@/registry/default/ui/progress-ring"

// Placeholder figures. Replace them with your real, current numbers.
const stats = [
  { value: 98, label: "Customer satisfaction", detail: "From 1,200 post-support surveys" },
  { value: 87, label: "Issues resolved on first reply", detail: "Last 90 days" },
  { value: 64, label: "Faster page loads", detail: "Median, after migrating" },
]

/** Three key percentages shown as progress rings with a label and short context. */
export function Stats02() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Results that add up</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <li key={stat.label} className="flex items-center gap-5 rounded-xl border bg-card p-6">
              <ProgressRing value={stat.value} label={stat.label} size={84} strokeWidth={7} />
              <div>
                <h3 className="font-medium">{stat.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
