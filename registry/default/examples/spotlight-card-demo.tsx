import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-full max-w-sm p-6">
      <p className="text-sm font-medium text-muted-foreground">API requests this month</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
        12,480 <span className="text-base font-normal text-muted-foreground">of 50,000</span>
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/4 rounded-full bg-foreground" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Resets on 1 December.</p>
    </SpotlightCard>
  )
}
