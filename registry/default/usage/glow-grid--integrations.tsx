import { Bell, Calendar, FileText, GitBranch, Mail, Receipt } from "lucide-react"

import { GlowCard, GlowGrid } from "@/registry/default/ui/glow-grid"

export const meta = {
  title: "Integrations page",
  description: "A glow grid of integration cards; the light follows the pointer across the whole grid.",
}

// The integrations are generic categories; the product is made up.
const INTEGRATIONS = [
  { icon: GitBranch, name: "Code hosting", text: "Link pull requests to tasks and close them on merge." },
  { icon: Mail, name: "Email", text: "Turn a forwarded email into a task with the thread attached." },
  { icon: Calendar, name: "Calendar", text: "Show due dates next to your meetings." },
  { icon: Bell, name: "Team chat", text: "Post updates to a channel when a project changes status." },
  { icon: Receipt, name: "Invoicing", text: "Bill tracked hours to the right client automatically." },
  { icon: FileText, name: "Docs", text: "Embed live task lists in your team's documents." },
]

export default function Integrations() {
  return (
    <section className="dark bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight">Connects to the tools you already use</h2>
        <p className="mt-2 text-muted-foreground">Kestrel syncs both ways, so nobody has to update two places.</p>
        <GlowGrid className="mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map(({ icon: Icon, name, text }) => (
            <GlowCard key={name}>
              <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
              <p className="mt-4 font-medium">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </GlowCard>
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}
