import { ArrowUpRight } from "lucide-react"

import { Magnetic } from "@/registry/default/ui/magnetic"

export default function MagneticDemo() {
  return (
    <Magnetic>
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-full border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
      >
        Get in touch
        <ArrowUpRight className="size-4" />
      </button>
    </Magnetic>
  )
}
