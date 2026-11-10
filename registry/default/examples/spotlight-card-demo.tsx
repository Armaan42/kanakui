import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-full max-w-sm p-6">
      <p className="text-sm font-medium text-muted-foreground">Usage this month</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">12,480</p>
      <p className="mt-1 text-sm text-muted-foreground">Move your pointer across the card.</p>
    </SpotlightCard>
  )
}
