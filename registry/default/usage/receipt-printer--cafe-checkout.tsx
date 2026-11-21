import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ReceiptPrinter } from "@/registry/default/ui/receipt-printer"

export const meta = {
  title: "Café order complete",
  description: "The receipt printer on a café's order-complete screen, printing the receipt beside the pickup details.",
}

// The café, order and address are made up.
export default function CafeCheckout() {
  return (
    <div className="mx-auto grid max-w-4xl items-start gap-10 px-6 py-12 md:grid-cols-2">
      <div>
        <span className="grid size-11 place-items-center rounded-full bg-muted">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Order 214 is being made</h1>
        <p className="mt-2 text-muted-foreground">Collect it from the counter by the window in about 6 minutes. We&apos;ll text you when it&apos;s ready.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>Track my order</Button>
          <Button variant="outline">Email receipt</Button>
        </div>
      </div>
      <ReceiptPrinter
        store="Kiln Corner Café"
        address="Rua das Flores 12, Lisboa"
        orderId="214"
        date="21 Nov 2026, 09:41"
        paidWith="Card •• 4821"
        currency="EUR"
        locale="pt-PT"
        taxRate={0.13}
        items={[
          { name: "Flat white", quantity: 2, price: 3.2 },
          { name: "Pastel de nata", quantity: 2, price: 1.4 },
          { name: "Grain bowl", quantity: 1, price: 9.5 },
        ]}
      />
    </div>
  )
}
