import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DottedGlobe } from "@/registry/default/ui/dotted-globe"

export const meta = {
  title: "Shipping coverage hero",
  description: "The dotted globe beside a logistics company's hero, with delivery times by region next to it.",
}

// The company and delivery times are made up.
const REGIONS = [
  { region: "Europe", days: "2–4 days" },
  { region: "North America", days: "3–5 days" },
  { region: "Asia Pacific", days: "4–7 days" },
  { region: "Latin America", days: "5–8 days" },
]

export default function ShippingCoverage() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Ship to 120 countries from one dashboard</h1>
        <p className="mt-5 max-w-lg text-lg text-muted-foreground">
          Ridgeway Freight books the carrier, prints the customs forms and tracks every parcel to the door.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">
            Get a shipping quote
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline">
            Talk to sales
          </Button>
        </div>
        <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t pt-6">
          {REGIONS.map((r) => (
            <div key={r.region}>
              <dt className="text-sm text-muted-foreground">{r.region}</dt>
              <dd className="font-medium tabular-nums">{r.days}</dd>
            </div>
          ))}
        </dl>
      </div>
      <DottedGlobe className="aspect-square w-full max-w-lg justify-self-center" label="A slowly turning globe of dots" />
    </section>
  )
}
