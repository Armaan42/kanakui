import { TiltCard } from "@/registry/default/ui/tilt-card"

// Sample photos. Swap in your own. The product is made up.
const PHOTO = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=720&h=520&fit=crop&auto=format&q=80"

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-72">
      <img src={PHOTO} alt="A white smartwatch with a round black face, lying on a pale grey surface" width={720} height={520} className="aspect-[36/26] w-full object-cover" />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-medium">Orbit Watch</p>
          <p className="font-medium tabular-nums">$249</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Ceramic case, 40 mm, chalk strap</p>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" className="h-9 flex-1 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Add to bag
          </button>
          <span role="img" aria-label="Colours: chalk, graphite and sand" className="flex items-center gap-1">
            <span className="size-4 rounded-full border bg-[#f1efea]" />
            <span className="size-4 rounded-full border bg-[#2b2b2e]" />
            <span className="size-4 rounded-full border bg-[#d8c7a8]" />
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
