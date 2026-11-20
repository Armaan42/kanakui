import { AnimatedCard } from "@/registry/default/ui/animated-card"

export default function AnimatedCardDemo() {
  return (
    <AnimatedCard className="w-full max-w-sm p-6">
      <p className="text-sm font-medium text-muted-foreground">Pro plan</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">
        $24<span className="text-base font-normal text-muted-foreground">/month</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Unlimited projects, 50 GB of storage and priority email support.</p>
    </AnimatedCard>
  )
}
