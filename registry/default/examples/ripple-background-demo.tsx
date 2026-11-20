import { Bluetooth } from "lucide-react"

import { RippleBackground } from "@/registry/default/ui/ripple-background"

export default function RippleBackgroundDemo() {
  return (
    <div className="relative flex h-72 w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-xl border bg-background">
      <RippleBackground />
      <span className="relative inline-flex size-14 items-center justify-center rounded-full border bg-card">
        <Bluetooth className="size-6" aria-hidden="true" />
      </span>
      <p role="status" className="relative mt-24 text-sm font-medium">
        Looking for nearby headphones…
      </p>
    </div>
  )
}
