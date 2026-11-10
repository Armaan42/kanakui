import { Check } from "lucide-react"

const rows = [
  {
    eyebrow: "Collaborate",
    title: "Review work where it lives",
    body: "Comment on the real page, not a screenshot. Every thread stays attached to the change it’s about.",
    points: ["Inline comments", "Mentions and assignments", "Resolved threads stay searchable"],
  },
  {
    eyebrow: "Automate",
    title: "Let the checks run themselves",
    body: "Tests, previews and performance budgets run on every change, so reviews focus on what matters.",
    points: ["Runs on every push", "Blocks merges on failure", "Clear, linkable reports"],
  },
  {
    eyebrow: "Measure",
    title: "Know what each release changed",
    body: "Compare before and after for every deploy, and roll back in one click when something regresses.",
    points: ["Per-release metrics", "Automatic alerts", "One-click rollback"],
  },
]

/**
 * Features as alternating rows of text and visual. Rows flip sides on large
 * screens and stack on small ones. Replace the grey panels with screenshots.
 */
export function Features03() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 sm:space-y-28">
        {rows.map((row, index) => (
          <div key={row.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{row.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{row.title}</h2>
              <p className="mt-4 text-pretty text-muted-foreground">{row.body}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {row.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="size-4 text-muted-foreground" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden="true" className="aspect-[4/3] rounded-xl border bg-muted/40 p-4">
              <div className="flex h-full flex-col gap-3 rounded-lg border bg-background p-4">
                <div className="h-3 w-1/3 rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
                <div className="mt-auto grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-md bg-muted" />
                  <div className="h-16 rounded-md bg-muted" />
                  <div className="h-16 rounded-md bg-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
