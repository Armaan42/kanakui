import { BatteryFull, Droplets, Headphones, Volume2, Wifi, Zap } from "lucide-react"

import { Cube3d } from "@/registry/default/ui/cube-3d"

export const meta = {
  title: "Product spec section",
  description: "A turning cube with one spec per face beside a speaker's product description.",
}

// The product and specs are made up.
const FACES = [
  { icon: BatteryFull, label: "20 h battery" },
  { icon: Droplets, label: "Splash proof" },
  { icon: Wifi, label: "Multi-room" },
  { icon: Volume2, label: "360° sound" },
  { icon: Zap, label: "Fast charge" },
  { icon: Headphones, label: "Pairs in 2 s" },
]

export default function ProductFeatures() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Oakline One · portable speaker</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Small enough for a coat pocket, loud enough for the garden</h2>
        <p className="mt-4 text-muted-foreground">Fabric over a steel frame, a strap that clips to a bag, and a battery that lasts a long weekend.</p>
        <p className="mt-6 text-2xl font-semibold tabular-nums">€129</p>
      </div>
      <div className="flex justify-center py-8">
        <Cube3d
          size={180}
          faces={FACES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex size-full flex-col items-center justify-center gap-3 border bg-card">
              <Icon aria-hidden="true" className="size-8" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        />
      </div>
    </section>
  )
}
