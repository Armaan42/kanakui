import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArcGlobe } from "@/registry/default/ui/arc-globe"
import { GlowBorderButton } from "@/registry/default/ui/glow-border-button"

const stats = [
  { value: "120+", label: "edge locations" },
  { value: "40 ms", label: "median latency" },
  { value: "99.99%", label: "uptime target" },
]

/**
 * A split hero with a globe of glowing routes beside the pitch. The numbers
 * are placeholders: show only figures you can back up.
 */
export function Hero10() {
  return (
    <section className="dark overflow-hidden border-b bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Global by default</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Fast for every user, everywhere
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-pretty text-muted-foreground sm:text-lg lg:mx-0">
            Your app runs close to every visitor. Replace this sentence with what makes yours different.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <GlowBorderButton className="h-11">
              Start deploying
              <ArrowRight aria-hidden="true" />
            </GlowBorderButton>
            <Button size="lg" variant="ghost" className="h-11 px-6">
              Talk to sales
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ArcGlobe className="mx-auto max-w-md text-indigo-100 lg:max-w-none" label="Globe with routes between regions" />
      </div>
    </section>
  )
}
