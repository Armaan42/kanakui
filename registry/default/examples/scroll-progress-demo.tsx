"use client"

import * as React from "react"

import { ScrollProgress } from "@/registry/default/ui/scroll-progress"

export default function ScrollProgressDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <ScrollProgress target={ref} label="Article progress" />
      <div ref={ref} className="h-56 space-y-3 overflow-y-auto p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Scroll inside this box</p>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>Paragraph {i + 1}. The bar above fills as you read further down.</p>
        ))}
      </div>
    </div>
  )
}
