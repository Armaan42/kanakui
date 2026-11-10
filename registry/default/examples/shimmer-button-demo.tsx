import { ArrowRight } from "lucide-react"

import { ShimmerButton } from "@/registry/default/ui/shimmer-button"

export default function ShimmerButtonDemo() {
  return (
    <ShimmerButton>
      Get started
      <ArrowRight />
    </ShimmerButton>
  )
}
