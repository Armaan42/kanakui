import { Check, MapPin, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReceiptPrinter } from "@/registry/default/ui/receipt-printer"

// Sample photos. Swap in your own. The shop and products are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=75`

const items = [
  { name: "Studio headphones", detail: "Black · Wireless", quantity: 1, price: 189, image: photo("1505740420928-5e560c06d30e"), alt: "Black over-ear headphones on a yellow background" },
  { name: "Minimal watch", detail: "White · 38 mm", quantity: 1, price: 129, image: photo("1523275335684-37898b6baf30"), alt: "A white minimalist wristwatch" },
]

const steps = [
  { label: "Ordered", date: "Mon 16 Nov", done: true, icon: Check },
  { label: "Packed", date: "Mon 16 Nov", done: true, icon: Package },
  { label: "Shipped", date: "Today", done: false, current: true, icon: Truck },
  { label: "Delivered", date: "Thu 19 Nov", done: false, icon: MapPin },
]

/** An order confirmation: delivery progress, the items, and the printed receipt. */
export function Order01() {
  return (
    <section aria-labelledby="order-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <Check aria-hidden="true" className="size-4" /> Order #A-20419 confirmed
          </p>
          <h2 id="order-01-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Thanks, Priya! It’s on its way.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Arriving <strong className="font-medium text-foreground">Thursday 19 November</strong>. We’ll email you when it’s out for delivery.
          </p>

          <ol className="mt-10 grid grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li key={step.label} className="relative flex flex-col items-center text-center" aria-current={step.current ? "step" : undefined}>
                  {index > 0 ? (
                    <span aria-hidden="true" className={cn("absolute top-4 right-1/2 h-0.5 w-full -translate-y-1/2", step.done || step.current ? "bg-emerald-500" : "bg-border")} />
                  ) : null}
                  <span
                    className={cn(
                      "relative grid size-8 place-items-center rounded-full border-2",
                      step.done ? "border-emerald-500 bg-emerald-500 text-white" : step.current ? "border-emerald-500 bg-background text-emerald-600" : "border-border bg-background text-muted-foreground"
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {step.current ? <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border-2 border-emerald-500 motion-reduce:hidden" /> : null}
                  </span>
                  <span className="mt-2 text-xs font-medium sm:text-sm">{step.label}</span>
                  <span className="text-[11px] text-muted-foreground">{step.date}</span>
                  <span className="sr-only">{step.done ? "(done)" : step.current ? "(in progress)" : "(to come)"}</span>
                </li>
              )
            })}
          </ol>

          <ul className="mt-10 divide-y rounded-2xl border bg-card">
            {items.map((item) => (
              <li key={item.name} className="flex items-center gap-4 p-4">
                <img src={item.image} alt={item.alt} className="size-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.detail} · Qty {item.quantity}
                  </p>
                </div>
                <p className="font-medium tabular-nums">${item.price}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Delivering to Priya Natarajan, 41 Rua das Flores, 1200-195 Lisbon
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="#">Track your order</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#">Continue shopping</a>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:pt-4">
          <ReceiptPrinter
            store="Northlight Supply"
            address="northwindsupply.com"
            date="16 Nov 2026, 09:41"
            orderId="#A-20419"
            taxRate={0.08}
            paidWith="Card •• 4821"
            items={items.map(({ name, quantity, price }) => ({ name, quantity, price }))}
          />
        </div>
      </div>
    </section>
  )
}
