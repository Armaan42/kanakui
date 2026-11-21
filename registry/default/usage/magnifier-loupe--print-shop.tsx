import { Button } from "@/components/ui/button"
import { MagnifierLoupe } from "@/registry/default/ui/magnifier-loupe"

export const meta = {
  title: "Art print product page",
  description: "The magnifier loupe on a print shop's product page, so buyers can inspect the detail before choosing a size.",
}

// Sample photo. Swap in your own. The shop, print and prices are made up.
const PHOTO = "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&h=1200&fit=crop&auto=format&q=80"
const SIZES = [
  { size: "30 × 40 cm", price: "€45" },
  { size: "50 × 70 cm", price: "€85" },
  { size: "70 × 100 cm", price: "€140" },
]

export default function PrintShop() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_1fr]">
      <MagnifierLoupe src={PHOTO} alt="The Rialto Bridge over the Grand Canal in Venice, with gondolas on the water" caption="Hover or drag to look closer" />
      <div>
        <p className="text-sm text-muted-foreground">Paperkite Prints · Venice series</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Morning on the Grand Canal</h1>
        <p className="mt-3 text-muted-foreground">Giclée print on 310 gsm cotton rag paper, signed on the back. Printed to order and shipped flat in 5 working days.</p>
        <fieldset className="mt-6">
          <legend className="text-sm font-medium">Size</legend>
          <div className="mt-2 grid gap-2">
            {SIZES.map((s, i) => (
              <label key={s.size} className="flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm has-[:checked]:border-foreground">
                <span className="flex items-center gap-3">
                  <input type="radio" name="size" defaultChecked={i === 1} className="accent-foreground" />
                  {s.size}
                </span>
                <span className="tabular-nums">{s.price}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Button size="lg" className="mt-6 w-full">
          Add to basket
        </Button>
      </div>
    </div>
  )
}
