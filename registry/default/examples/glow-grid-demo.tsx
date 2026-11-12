import { GlowCard, GlowGrid } from "@/registry/default/ui/glow-grid"

const cards = [
  { title: "Analytics", body: "See what people do in your app." },
  { title: "Alerts", body: "Hear about problems first." },
  { title: "Automations", body: "Let routine work run itself." },
  { title: "Reports", body: "Share results with your team." },
]

export default function GlowGridDemo() {
  return (
    <GlowGrid className="w-full max-w-xl sm:grid-cols-2">
      {cards.map((card) => (
        <GlowCard key={card.title}>
          <p className="font-medium">{card.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{card.body}</p>
        </GlowCard>
      ))}
    </GlowGrid>
  )
}
