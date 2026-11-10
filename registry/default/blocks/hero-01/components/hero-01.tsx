import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/registry/default/ui/shimmer-button"

/**
 * Centered hero with an announcement link, headline, two calls to action and
 * a product window placeholder. Replace the text, links and the window
 * contents with your own; the layout adapts from phones to wide screens.
 */
export function Hero01() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 text-center sm:px-6 sm:pt-28">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
          Version 2.0 is out. See what’s new
          <ArrowRight aria-hidden="true" className="size-3" />
        </a>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Ship your product page this afternoon
        </h1>
        <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          Replace this paragraph with one or two sentences about what your product does and who it is for.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ShimmerButton className="h-10 px-5">
            Start free trial
            <ArrowRight />
          </ShimmerButton>
          <Button variant="outline" size="lg" className="h-10 px-5">
            Book a demo
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card required. Cancel anytime.</p>

        {/* Product window placeholder: swap for a screenshot or video. */}
        <div aria-hidden="true" className="mt-14 w-full rounded-t-xl border border-b-0 bg-muted/30 p-2 pb-0 sm:mt-16">
          <div className="flex items-center gap-1.5 px-2 pb-2">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </div>
          <div className="grid h-56 grid-cols-[8rem_1fr] gap-2 rounded-t-lg border border-b-0 bg-background p-3 sm:h-72 md:grid-cols-[11rem_1fr]">
            <div className="hidden space-y-2 sm:block">
              {[70, 55, 80, 45, 60].map((w) => (
                <div key={w} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="col-span-2 grid grid-rows-[auto_1fr] gap-2 sm:col-span-1">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-14 rounded-md border bg-muted/40" />
                ))}
              </div>
              <div className="rounded-md border bg-muted/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
