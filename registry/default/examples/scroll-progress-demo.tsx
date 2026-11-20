"use client"

import * as React from "react"

import { ScrollProgress } from "@/registry/default/ui/scroll-progress"

const STEPS = [
  "Water the plant a day before. Damp roots slide out of the old pot far more easily than dry ones.",
  "Pick a new pot only one size up, about 2 to 5 cm wider, with a drainage hole. Too much extra soil stays wet and rots the roots.",
  "Tip the plant on its side, hold it by the base of the stems and ease it out. Squeeze a plastic pot or run a knife around the edge if it sticks.",
  "Tease the outer roots loose with your fingers. Trim any that are brown and mushy.",
  "Add fresh potting mix to the new pot so the top of the root ball sits about 2 cm below the rim.",
  "Set the plant in, fill around the sides and press the mix down lightly. Don't bury the stems deeper than before.",
  "Water slowly until it runs out of the bottom, then let it drain.",
  "Keep it out of strong direct sun for a week while the roots settle. A few droopy leaves are normal.",
]

export default function ScrollProgressDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <ScrollProgress target={ref} label="Article progress" />
      <div ref={ref} tabIndex={0} role="region" aria-label="How to repot a houseplant" className="h-64 space-y-3 overflow-y-auto p-5 text-sm leading-relaxed text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset">
        <p className="text-base font-semibold text-foreground">How to repot a houseplant</p>
        <p>Most houseplants need a bigger pot every year or two, usually in spring. Roots poking out of the drainage hole are the giveaway.</p>
        <ol className="list-decimal space-y-3 pl-5">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
