import { Radio } from "lucide-react"

import { RippleBackground } from "@/registry/default/ui/ripple-background"

export default function RippleBackgroundDemo() {
  return (
    <div className="relative flex h-72 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background">
      <RippleBackground />
      <span className="relative inline-flex size-14 items-center justify-center rounded-full border bg-card">
        <Radio className="size-6" aria-hidden="true" />
      </span>
    </div>
  )
}
