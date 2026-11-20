import { Droplets, Gem, Ruler, Watch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MagnifierLoupe } from "@/registry/default/ui/magnifier-loupe"

// Sample photos. Swap in your own. The watch and brand are made up.
const PHOTO = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&h=1200&fit=crop&auto=format&q=85"

const specs = [
  { icon: Watch, label: "Movement", value: "Swiss automatic, 42 h reserve" },
  { icon: Ruler, label: "Case", value: "38 mm, brushed steel" },
  { icon: Gem, label: "Crystal", value: "Sapphire, anti-reflective" },
  { icon: Droplets, label: "Water", value: "Resistant to 50 m" },
]

/** A product detail section where shoppers inspect the photo with a magnifying glass. */
export function ProductZoom01() {
  return (
    <section aria-labelledby="product-zoom-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <MagnifierLoupe src={PHOTO} alt="Two white minimalist wristwatches on a grey surface" zoom={3} caption="Hover or tap the photo to look closer." className="max-w-none" />
        <div>
          <p className="text-sm text-muted-foreground">Halden Watch Co.</p>
          <h2 id="product-zoom-01-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Field 38, Chalk
          </h2>
          <p className="mt-3 font-mono text-xl tabular-nums">$640</p>
          <p className="mt-5 leading-7 text-muted-foreground">
            A quiet dial, a domed sapphire crystal and hand-finished hands. Every detail is meant to be looked at up close,
            so go ahead.
          </p>
          <dl className="mt-8 grid gap-4 border-y py-6 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                  <spec.icon aria-hidden="true" className="size-4 shrink-0" />
                  {spec.label}
                </dt>
                <dd className="mt-0.5 pl-6 text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg">Add to bag</Button>
            <Button size="lg" variant="outline">
              Book a fitting
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
