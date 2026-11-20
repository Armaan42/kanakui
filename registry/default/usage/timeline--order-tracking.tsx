import { Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Timeline } from "@/registry/default/ui/timeline"

export const meta = {
  title: "Order tracking",
  description: "A timeline as the delivery history on an order page, with the current step marked and the order summary beside it.",
}

// The shop, order and address are made up.
export default function OrderTracking() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Order #48213 · placed 18 Nov 2026</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Arriving Friday, 21 November</h1>
      <p className="mt-1 text-sm text-muted-foreground">Out with the courier by 8:00. Delivery between 10:00 and 14:00.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section aria-labelledby="tracking-title" className="rounded-xl border bg-card p-6">
          <h2 id="tracking-title" className="mb-6 flex items-center gap-2 font-medium">
            <Truck aria-hidden="true" className="size-4" />
            Delivery history
          </h2>
          <Timeline
            entries={[
              { id: "transit", date: "20 Nov, 06:12", title: "At the Lisbon depot", description: "Sorted onto tomorrow's route.", current: true },
              { id: "shipped", date: "19 Nov, 17:40", title: "Shipped", description: "Handed to Ridgeway Freight, tracking RF 2209 4471." },
              { id: "packed", date: "19 Nov, 11:05", title: "Packed", description: "Two items in one box." },
              { id: "ordered", date: "18 Nov, 21:33", title: "Order placed", description: "Payment confirmed." },
            ]}
          />
        </section>

        <aside className="space-y-4">
          <section aria-labelledby="summary-title" className="rounded-xl border p-5">
            <h2 id="summary-title" className="flex items-center gap-2 font-medium">
              <Package aria-hidden="true" className="size-4" />
              In this order
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span>Linen tote bag</span>
                <span className="tabular-nums">$48.00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Stoneware mug, sand</span>
                <span className="tabular-nums">$22.00</span>
              </li>
              <li className="flex justify-between gap-4 border-t pt-2 font-medium">
                <span>Total</span>
                <span className="tabular-nums">$70.00</span>
              </li>
            </ul>
          </section>
          <section aria-labelledby="address-title" className="rounded-xl border p-5 text-sm">
            <h2 id="address-title" className="font-medium">
              Delivering to
            </h2>
            <p className="mt-2 text-muted-foreground">
              Ana Ribeiro
              <br />
              Rua das Flores 28, 2º
              <br />
              1200-195 Lisboa
            </p>
          </section>
          <Button variant="outline" className="w-full">
            Change delivery day
          </Button>
        </aside>
      </div>
    </div>
  )
}
