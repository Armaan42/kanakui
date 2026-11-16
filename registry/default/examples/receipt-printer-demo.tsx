import { ReceiptPrinter } from "@/registry/default/ui/receipt-printer"

// The café is made up.
export default function ReceiptPrinterDemo() {
  return (
    <ReceiptPrinter
      store="Little Fern Café"
      address="12 Harbour Street, Lisbon"
      date="16 Nov 2026, 09:41"
      orderId="#0482"
      currency="EUR"
      locale="en-IE"
      taxRate={0.13}
      paidWith="Visa •• 4821"
      items={[
        { name: "Flat white", quantity: 2, price: 3.4 },
        { name: "Pastel de nata", quantity: 3, price: 1.6 },
        { name: "Avocado toast", quantity: 1, price: 8.5 },
        { name: "Orange juice", quantity: 1, price: 3.9 },
      ]}
    />
  )
}
