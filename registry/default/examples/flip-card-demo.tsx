import { FlipCard } from "@/registry/default/ui/flip-card"

export default function FlipCardDemo() {
  return (
    <FlipCard
      flipOnHover
      flipLabel="Show plan details"
      front={
        <div className="flex h-full flex-col justify-between">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Team plan</p>
          <p className="text-4xl font-semibold tracking-tight">$79<span className="text-base font-normal text-muted-foreground">/month</span></p>
          <p className="text-sm text-muted-foreground">Hover, or press the button to flip.</p>
        </div>
      }
      back={
        <ul className="space-y-2 text-sm">
          <li>Up to 10 members</li>
          <li>Roles and permissions</li>
          <li>Priority support</li>
          <li>Audit log</li>
        </ul>
      }
    />
  )
}
