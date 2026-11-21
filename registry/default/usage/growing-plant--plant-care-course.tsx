"use client"

import * as React from "react"

import { GrowingPlant } from "@/registry/default/ui/growing-plant"

export const meta = {
  title: "Plant care course",
  description: "The growing plant as the practice pot in a beginner's plant care course: water only when the soil is dry and it flowers.",
}

// The course is made up.
const RULES = [
  { title: "Light first", text: "Most houseplants want bright light, but not direct midday sun." },
  { title: "Feel the soil", text: "Water when the top few centimetres are dry, not on a schedule." },
  { title: "Less is more", text: "More plants die from too much water than too little." },
]

export default function PlantCare() {
  const [bloomed, setBloomed] = React.useState(false)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <GrowingPlant className="mx-auto" bloom="#e8742c" onBloom={() => setBloomed(true)} />
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Garden School · Houseplants 101</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Grow your practice pot</h1>
        <p className="mt-2 text-muted-foreground">Give it light, then water only when it needs it. Get it to flower to finish the lesson.</p>
        <ul className="mt-6 space-y-4">
          {RULES.map((rule) => (
            <li key={rule.title}>
              <p className="font-medium">{rule.title}</p>
              <p className="text-sm text-muted-foreground">{rule.text}</p>
            </li>
          ))}
        </ul>
        <p role="status" className="mt-6 text-sm font-medium">
          {bloomed ? "It flowered. Lesson complete, on to repotting." : ""}
        </p>
      </div>
    </div>
  )
}
