import { Bell, Code2, Gauge, Globe, Lock, Workflow, type LucideIcon } from "lucide-react"

import { GlowCard, GlowGrid } from "@/registry/default/ui/glow-grid"

const features: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Gauge, title: "Fast by default", body: "Pages load quickly on every device and network." },
  { icon: Lock, title: "Secure sign-in", body: "Passkeys, single sign-on and roles built in." },
  { icon: Workflow, title: "Automations", body: "Run tasks when something changes, without code." },
  { icon: Globe, title: "Global", body: "Serve people from the region nearest them." },
  { icon: Code2, title: "Developer API", body: "Everything in the app is available over the API." },
  { icon: Bell, title: "Alerts", body: "Hear about problems before your users do." },
]

/** Six feature cards whose borders light up near the pointer. The features are placeholders. */
export function Features06() {
  return (
    <section className="border-b bg-background px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Everything your team needs</h2>
          <p className="mt-3 text-pretty text-muted-foreground">Move your pointer across the cards. Replace them with your real features.</p>
        </div>
        <GlowGrid className="mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <GlowCard key={title} className="p-6">
              <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </GlowCard>
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}
