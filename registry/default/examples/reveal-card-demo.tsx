import { RevealCard } from "@/registry/default/ui/reveal-card"

export default function RevealCardDemo() {
  return (
    <RevealCard
      title="Mountain cabin"
      media={<div className="size-full bg-linear-to-br from-muted to-muted-foreground/30" />}
    >
      <p>Two bedrooms, wood stove, and a view of the valley. Available from March.</p>
      <a href="#" className="mt-3 inline-block font-medium text-foreground underline underline-offset-4">
        View details
      </a>
    </RevealCard>
  )
}
