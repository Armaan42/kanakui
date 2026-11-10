import { ArrowRight, Check, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridPattern } from "@/registry/default/ui/grid-pattern"

const points = ["Accessible by default", "Dark mode built in", "Own every line of code"]

/**
 * Split hero: pitch and actions on the left, a terminal card on the right.
 * Stacks on small screens. Replace the copy, points and terminal lines.
 */
export function Hero02() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <GridPattern fade className="text-foreground/[0.07]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Developer platform</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            From idea to production without the glue code
          </h1>
          <p className="mt-5 max-w-lg text-base text-pretty text-muted-foreground sm:text-lg">
            Describe what makes your product different in one or two sentences. Keep it concrete.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-muted-foreground" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-10 px-5">
              Get started
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-5">
              Read the docs
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-4 py-2.5 text-xs text-muted-foreground">
            <Terminal aria-hidden="true" className="size-3.5" />
            Terminal
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
            <code>
              <span className="text-muted-foreground">$ </span>npx create-acme-app@latest my-app{"\n"}
              <span className="text-muted-foreground">✓ Created my-app{"\n"}✓ Installed dependencies{"\n"}</span>
              <span className="text-muted-foreground">$ </span>cd my-app && npm run dev{"\n"}
              <span className="text-emerald-600 dark:text-emerald-400">▲ Ready on http://localhost:3000</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
