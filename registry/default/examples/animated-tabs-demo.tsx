import { AnimatedTabs } from "@/registry/default/ui/animated-tabs"

export default function AnimatedTabsDemo() {
  return (
    <AnimatedTabs
      label="Account"
      className="max-w-md"
      tabs={[
        { value: "overview", label: "Overview", content: <p className="text-sm text-muted-foreground">Usage, plan and recent activity at a glance.</p> },
        { value: "billing", label: "Billing", content: <p className="text-sm text-muted-foreground">Invoices, payment methods and tax details.</p> },
        { value: "team", label: "Team", content: <p className="text-sm text-muted-foreground">Invite people and manage roles.</p> },
      ]}
    />
  )
}
