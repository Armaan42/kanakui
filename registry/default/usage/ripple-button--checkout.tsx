"use client"

import * as React from "react"
import { Check, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { RippleButton } from "@/registry/default/ui/ripple-button"

export const meta = {
  title: "Checkout",
  description: "The ripple button as the Pay button at the end of a checkout, with the order summary beside it.",
}

// The shop and order are made up.
const ITEMS = [
  { name: "Linen tote bag", detail: "Natural", price: 48 },
  { name: "Stoneware mug", detail: "Sand, 350 ml", price: 22 },
]

export default function Checkout() {
  const [paid, setPaid] = React.useState(false)
  const subtotal = ITEMS.reduce((sum, item) => sum + item.price, 0)
  const shipping = 6
  const total = subtotal + shipping

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form
        className="grid content-start gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          setPaid(true)
        }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <fieldset className="grid gap-3">
          <legend className="mb-2 text-sm font-medium">Contact</legend>
          <Input type="email" aria-label="Email" defaultValue="ana.ribeiro@example.com" />
        </fieldset>
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-medium">Card</legend>
          <Input aria-label="Card number" inputMode="numeric" defaultValue="4000 1234 5678 9010" className="sm:col-span-2" />
          <Input aria-label="Expiry date" defaultValue="08 / 29" />
          <Input aria-label="Security code" inputMode="numeric" defaultValue="123" />
        </fieldset>
        {paid ? (
          <p role="status" className="flex items-center gap-2 rounded-lg border p-3 text-sm">
            <Check aria-hidden="true" className="size-4" />
            Paid ${total.toFixed(2)}. A receipt is on its way to your inbox.
          </p>
        ) : (
          <RippleButton type="submit" className="w-full">
            <Lock aria-hidden="true" className="size-4" />
            Pay ${total.toFixed(2)}
          </RippleButton>
        )}
        <p className="text-center text-xs text-muted-foreground">Test card. Nothing is charged.</p>
      </form>

      <aside aria-labelledby="summary" className="h-fit rounded-xl border bg-muted/30 p-5">
        <h2 id="summary" className="font-medium">
          Order summary
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {ITEMS.map((item) => (
            <li key={item.name} className="flex justify-between gap-4">
              <span>
                {item.name}
                <span className="block text-muted-foreground">{item.detail}</span>
              </span>
              <span className="tabular-nums">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1.5 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="tabular-nums">${shipping.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">${total.toFixed(2)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}
