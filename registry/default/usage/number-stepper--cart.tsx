"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NumberStepper } from "@/registry/default/ui/number-stepper"

export const meta = {
  title: "Shopping cart",
  description: "Number steppers for quantities in a shopping cart; line totals and the order total update as they change.",
}

// Sample photos. Swap in your own. The shop and products are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=70`
const PRODUCTS = [
  { id: "watch", name: "Orbit Watch", detail: "Chalk strap, 40 mm", price: 249, img: "1523275335684-37898b6baf30", alt: "A white smartwatch on a grey surface" },
  { id: "headphones", name: "Field Headphones", detail: "Graphite", price: 189, img: "1505740420928-5e560c06d30e", alt: "Black over-ear headphones on a yellow background" },
]

export default function Cart() {
  const [qty, setQty] = React.useState<Record<string, number>>({ watch: 1, headphones: 2 })
  const items = PRODUCTS.filter((p) => qty[p.id] > 0)
  const subtotal = items.reduce((sum, p) => sum + p.price * qty[p.id], 0)
  const shipping = subtotal >= 300 ? 0 : 9

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Your cart is empty.</p>
      ) : (
        <ul className="mt-6 divide-y border-y">
          {items.map((product) => (
            <li key={product.id} className="flex flex-wrap items-center gap-4 py-5">
              <img src={photo(product.img)} alt={product.alt} width={200} height={200} className="size-20 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.detail}</p>
                <p className="mt-1 text-sm tabular-nums">${product.price} each</p>
              </div>
              <NumberStepper
                label="Quantity"
                value={qty[product.id]}
                onValueChange={(value) => setQty((q) => ({ ...q, [product.id]: value }))}
                min={1}
                max={10}
              />
              <p className="w-20 text-right font-medium tabular-nums">${product.price * qty[product.id]}</p>
              <Button variant="ghost" size="icon-sm" aria-label={`Remove ${product.name}`} onClick={() => setQty((q) => ({ ...q, [product.id]: 0 }))}>
                <Trash2 aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-6 ml-auto max-w-xs space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">${subtotal}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping}`}</dd>
        </div>
        <div className="flex justify-between border-t pt-2 text-base font-medium">
          <dt>Total</dt>
          <dd className="tabular-nums">${subtotal + shipping}</dd>
        </div>
      </dl>
      <div className="mt-6 flex justify-end">
        <Button size="lg" disabled={items.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  )
}
