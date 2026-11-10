import { NumberTicker } from "@/registry/default/ui/number-ticker"

// Placeholder figures. Replace them with your real, current numbers.
const stats = [
  { value: 12000, suffix: "+", label: "Teams using the product" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Uptime over the last 12 months" },
  { value: 140, suffix: "ms", label: "Median response time" },
  { value: 32, label: "Countries served" },
]

/** Four key numbers that count up when they scroll into view. */
export function Stats01() {
  return (
    <section className="border-y bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="sr-only">Key numbers</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 border-l pl-6">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <NumberTicker value={stat.value} decimals={stat.decimals ?? 0} locale="en-US" />
                {stat.suffix ? <span>{stat.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
