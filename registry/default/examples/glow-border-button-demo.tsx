import { ArrowRight } from "lucide-react"

import { GlowBorderButton } from "@/registry/default/ui/glow-border-button"

export default function GlowBorderButtonDemo() {
  return (
    <GlowBorderButton>
      Get early access
      <ArrowRight aria-hidden="true" />
    </GlowBorderButton>
  )
}
