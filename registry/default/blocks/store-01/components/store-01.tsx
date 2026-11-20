"use client"

import * as React from "react"
import { Check, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample photos. Swap in your own. The product is made up.
const PHOTO = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop&auto=format&q=80"

const views = [
  { label: "Whole product", alt: "Black over-ear headphones on a yellow background", zoom: 1, origin: "50% 50%" },
  { label: "Ear cup detail", alt: "Close-up of the padded ear cup", zoom: 2.1, origin: "48% 72%" },
  { label: "Headband detail", alt: "Close-up of the curved headband", zoom: 2.1, origin: "52% 18%" },
]
const pads = [
  { name: "Memory foam", extra: 0 },
  { name: "Lambskin", extra: 30 },
]
const promises = [
  { icon: Truck, text: "Free delivery in 2 to 4 days" },
  { icon: RotateCcw, text: "30-day returns" },
  { icon: ShieldCheck, text: "2-year warranty" },
]
const PRICE = 249

/** A product page: zoomable gallery, options, quantity and add to bag. */
export function Store01() {
  const [view, setView] = React.useState(0)
  const [pad, setPad] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [inBag, setInBag] = React.useState(0)
  const name = React.useId()
  const current = views[view]
  const unit = PRICE + pads[pad].extra

  return (
    <section aria-labelledby="store-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div role="group" aria-label="Product views" className="flex gap-3 sm:flex-col">
            {views.map((item, i) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={view === i}
                aria-label={item.label}
                onClick={() => setView(i)}
                className={cn("size-16 overflow-hidden rounded-lg outline-none ring-1 ring-border focus-visible:ring-3 focus-visible:ring-ring/50", view === i && "ring-2 ring-foreground")}
              >
                <img src={PHOTO} alt="" className="size-full object-cover" style={{ transform: `scale(${item.zoom})`, transformOrigin: item.origin }} />
              </button>
            ))}
          </div>
          <div className="aspect-square min-w-0 flex-1 overflow-hidden rounded-2xl bg-muted">
            <img src={PHOTO} alt={current.alt} className="size-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `scale(${current.zoom})`, transformOrigin: current.origin }} />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Fieldnote Audio</p>
          <h2 id="store-01-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Studio One headphones
          </h2>
          <p className="mt-3 font-mono text-xl tabular-nums">${unit}</p>
          <p className="mt-5 leading-7 text-muted-foreground">Closed-back, hand-tuned drivers in a frame light enough to forget. Made for long sessions and quiet rooms.</p>

          <fieldset className="mt-7">
            <legend className="text-sm font-medium">Ear pads</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {pads.map((item, i) => (
                <label key={item.name} className="cursor-pointer">
                  <input type="radio" name={name} className="peer sr-only" checked={pad === i} onChange={() => setPad(i)} />
                  <span className="flex items-baseline justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm peer-checked:border-foreground peer-checked:ring-1 peer-checked:ring-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                    {item.name}
                    <span className="text-xs text-muted-foreground">{item.extra ? `+$${item.extra}` : "Included"}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Quantity" className="flex items-center rounded-lg border">
              <Button type="button" variant="ghost" size="icon" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                <Minus aria-hidden="true" className="size-4" />
              </Button>
              <output aria-live="polite" className="w-8 text-center text-sm tabular-nums">
                {quantity}
              </output>
              <Button type="button" variant="ghost" size="icon" aria-label="Increase quantity" disabled={quantity === 9} onClick={() => setQuantity(quantity + 1)}>
                <Plus aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <Button type="button" size="lg" className="min-w-44 flex-1" onClick={() => setInBag(inBag + quantity)}>
              Add to bag · ${unit * quantity}
            </Button>
          </div>
          <p role="status" className="mt-2 flex min-h-5 items-center gap-1.5 text-sm text-muted-foreground">
            {inBag > 0 ? (
              <>
                <Check aria-hidden="true" className="size-4" />
                {inBag} in your bag
              </>
            ) : null}
          </p>

          <ul className="mt-5 space-y-2 border-t pt-5 text-sm text-muted-foreground">
            {promises.map((item) => (
              <li key={item.text} className="flex items-center gap-2.5">
                <item.icon aria-hidden="true" className="size-4" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
