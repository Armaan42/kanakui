import { NumberTicker } from "@/registry/default/ui/number-ticker"

export const meta = {
  title: "Annual report figures",
  description: "Number tickers counting up as a row of headline figures scrolls into view on an annual report page.",
}

// The library network and its figures are made up.
const FIGURES = [
  { value: 1284000, label: "Books lent", note: "Up 18% on last year" },
  { value: 42, label: "Branches", note: "Three opened this year" },
  { value: 96.4, decimals: 1, suffix: "%", label: "Returned on time", note: "Fines were scrapped in March" },
  { value: 23800, label: "New members", note: "Most of them under 16" },
]

export default function ImpactReport() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-sm text-muted-foreground">Paperkite Libraries · Annual report 2026</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">A year of borrowing</h2>
      <dl className="mt-10 grid divide-y border-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {FIGURES.map((figure) => (
          <div key={figure.label} className="py-6 sm:px-6 lg:first:pl-0">
            <dt className="text-sm text-muted-foreground">{figure.label}</dt>
            <dd className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">
              <NumberTicker value={figure.value} decimals={figure.decimals ?? 0} locale="en-US" />
              {figure.suffix}
            </dd>
            <dd className="mt-2 text-sm text-muted-foreground">{figure.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
