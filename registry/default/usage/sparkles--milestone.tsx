import { Button } from "@/components/ui/button"
import { Sparkles } from "@/registry/default/ui/sparkles"

export const meta = {
  title: "Milestone celebration",
  description: "Sparkles on one word of a milestone screen in a shop dashboard, with the figures that earned it.",
}

// The shop and figures are made up.
export default function Milestone() {
  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col justify-center px-6 py-16 text-center">
      <p className="text-sm text-muted-foreground">Halden Goods · 18 months after launch</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        You just made your <Sparkles className="text-amber-600 dark:text-amber-400">10,000th</Sparkles> sale
      </h1>
      <p className="mt-4 text-muted-foreground">Order #10000 was a linen tote bag, shipped to Porto. Here&apos;s how you got here.</p>
      <dl className="mt-8 grid grid-cols-3 divide-x rounded-xl border bg-card py-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Customers</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">6,412</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Countries</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">31</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Repeat buyers</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">38%</dd>
        </div>
      </dl>
      <div className="mt-8 flex justify-center gap-3">
        <Button>Share with your team</Button>
        <Button variant="outline">Back to dashboard</Button>
      </div>
    </div>
  )
}
