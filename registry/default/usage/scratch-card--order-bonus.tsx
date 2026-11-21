import { Check } from "lucide-react"

import { ScratchCard } from "@/registry/default/ui/scratch-card"

export const meta = {
  title: "Order thank-you bonus",
  description: "A scratch card on a shop's order-confirmed page, hiding a discount for the next order.",
}

// The shop, order and discount are made up.
export default function OrderBonus() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check aria-hidden="true" className="size-4" />
        Order #48213 confirmed
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Thanks, Ana. A little something for next time.</h1>
      <p className="mt-2 text-muted-foreground">Scratch the card to see your discount. It&apos;s saved to your account either way.</p>
      <ScratchCard className="mt-8" label="Scratch to reveal your discount">
        <div className="flex size-full flex-col items-center justify-center bg-card text-center">
          <p className="text-sm text-muted-foreground">Your next order</p>
          <p className="mt-1 text-4xl font-semibold">15% off</p>
          <p className="mt-2 font-mono text-sm tracking-wider">HALDEN15-ANA</p>
        </div>
      </ScratchCard>
      <p className="mt-6 text-sm text-muted-foreground">Valid for 60 days on anything except gift cards.</p>
    </div>
  )
}
