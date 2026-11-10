import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DottedGlobe } from "@/registry/default/ui/dotted-globe"
import { StatusDot } from "@/registry/default/ui/status-dot"

const regions = ["Mumbai", "Frankfurt", "Virginia", "Tokyo"]

/** Split hero with an interactive 3D globe and a list of regions. Region names are placeholders. */
export function Hero08() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <StatusDot status="online" label="All systems normal" pulse />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Run close to every customer</h1>
          <p className="mt-5 max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
            Deploy once and serve people from the region nearest them. Replace with your own pitch.
          </p>
          <ul className="mt-6 grid max-w-sm grid-cols-2 gap-2 text-sm">
            {regions.map((region) => (
              <li key={region} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-muted-foreground" />
                {region}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-10 px-5">
              Deploy now
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-5">
              View regions
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <DottedGlobe className="max-w-sm" label="Globe showing global coverage" />
        </div>
      </div>
    </section>
  )
}
