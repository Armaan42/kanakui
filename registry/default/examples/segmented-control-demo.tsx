"use client"

import * as React from "react"

import { SegmentedControl } from "@/registry/default/ui/segmented-control"

export default function SegmentedControlDemo() {
  const [view, setView] = React.useState("preview")
  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl
        label="View"
        value={view}
        onValueChange={setView}
        options={[
          { value: "preview", label: "Preview" },
          { value: "code", label: "Code" },
          { value: "docs", label: "Docs" },
        ]}
      />
      <p className="text-sm text-muted-foreground">Selected: {view}</p>
    </div>
  )
}
