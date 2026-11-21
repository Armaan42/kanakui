import { Button } from "@/components/ui/button"
import { Matchbox } from "@/registry/default/ui/matchbox"

export const meta = {
  title: "Candle shop gift",
  description: "The matchbox on a candle shop's product page, showing the printed box of matches that comes free with every candle.",
}

// The shop and candle are made up.
export default function CandleShop() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Candles · Winter collection</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Cedar &amp; Smoke, 220 g</h1>
        <p className="mt-2 text-muted-foreground">Soy wax in a hand-thrown jar. About 45 hours of burn time, with a cotton wick that doesn&apos;t mushroom.</p>
        <p className="mt-4 text-2xl font-semibold">€32</p>
        <Button className="mt-4">Add to basket</Button>
        <p className="mt-6 text-sm text-muted-foreground">Every candle comes with a box of our matches. Strike one to try it.</p>
      </div>
      <Matchbox className="mx-auto" title="Copperleaf" subtitle="Safety matches · Made in Porto" count={12} />
    </div>
  )
}
