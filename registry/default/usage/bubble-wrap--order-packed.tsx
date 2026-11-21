"use client"

import * as React from "react"
import { PackageCheck } from "lucide-react"

import { BubbleWrap } from "@/registry/default/ui/bubble-wrap"

export const meta = {
  title: "Order packed",
  description: "Bubble wrap on a shop's “your order is packed” page, something to pop while you wait for the courier.",
}

// The shop and order are made up.
export default function OrderPacked() {
  const [popped, setPopped] = React.useState(0)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-start gap-3">
        <PackageCheck aria-hidden="true" className="mt-1 size-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your order is packed</h1>
          <p className="mt-1 text-muted-foreground">
            Copperleaf Ceramics order #3108: two mugs and a teapot, wrapped twice. The courier collects it this afternoon.
          </p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border bg-card p-6">
        <p className="text-sm font-medium">We saved you a bit of the wrapping.</p>
        <BubbleWrap className="mt-4" rows={4} columns={8} onPop={(count) => setPopped(count)} />
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {popped === 0 ? "Go on, pop one." : `${popped} popped. Very satisfying, we know.`}
        </p>
      </div>
    </div>
  )
}
