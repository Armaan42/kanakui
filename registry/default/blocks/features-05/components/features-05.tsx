import { Cloud, Database, GitBranch, Mail, MessageSquare, Shield, Webhook, Zap } from "lucide-react"

import { OrbitingCircles } from "@/registry/default/ui/orbiting-circles"

function Node({ icon: Icon, label }: { icon: typeof Cloud; label: string }) {
  return (
    <span className="flex size-10 items-center justify-center rounded-full border bg-card shadow-xs">
      <Icon aria-hidden="true" className="size-4" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

/** Integrations shown as icons orbiting your product's logo, beside a short pitch. */
export function Features05() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Integrations</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Connects to the tools you already use</h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            List the integrations you actually support. The icons around the logo are placeholders.
          </p>
        </div>
        <div className="relative mx-auto flex size-80 items-center justify-center sm:size-96">
          <span className="relative z-10 flex size-16 items-center justify-center rounded-2xl border bg-foreground font-semibold text-background">
            Acme
          </span>
          <OrbitingCircles radius={80} duration={20}>
            <Node icon={Database} label="Database" />
            <Node icon={Webhook} label="Webhooks" />
            <Node icon={Shield} label="Security" />
          </OrbitingCircles>
          <OrbitingCircles radius={150} duration={32} reverse>
            <Node icon={GitBranch} label="Git" />
            <Node icon={Mail} label="Email" />
            <Node icon={MessageSquare} label="Chat" />
            <Node icon={Cloud} label="Cloud storage" />
            <Node icon={Zap} label="Automations" />
          </OrbitingCircles>
        </div>
      </div>
    </section>
  )
}
