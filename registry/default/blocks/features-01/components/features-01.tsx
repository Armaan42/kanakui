import { Gauge, Layers, Lock, Palette, Puzzle, Workflow } from "lucide-react"

const features = [
  { icon: Gauge, title: "Fast by default", body: "Static pages, small bundles and lazy-loaded extras." },
  { icon: Lock, title: "Secure", body: "Sensible defaults for headers, sessions and data access." },
  { icon: Palette, title: "Themeable", body: "One set of tokens drives light mode, dark mode and your brand." },
  { icon: Puzzle, title: "Composable", body: "Small pieces that fit together instead of one big framework." },
  { icon: Workflow, title: "Automated", body: "Builds, previews and checks run on every change." },
  { icon: Layers, title: "Scales with you", body: "Start with one page and grow to hundreds without a rewrite." },
]

/** Six features in a responsive grid: one column on phones, two on tablets, three on desktops. */
export function Features01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything you need, nothing you don’t
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A short paragraph that frames the features below in terms of what your customer gets.
          </p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-background p-6">
              <span className="inline-flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
