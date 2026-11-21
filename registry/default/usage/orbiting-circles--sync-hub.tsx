import { Calendar, Cloud, FileText, Mail, MessageSquare, Receipt } from "lucide-react"

import { OrbitingCircles } from "@/registry/default/ui/orbiting-circles"

export const meta = {
  title: "Sync hub section",
  description: "Orbiting circles showing the tools a product keeps in sync, beside a short explanation of how syncing works.",
}

// The product is made up; the tools are generic categories.
const node = "flex size-10 items-center justify-center rounded-full border bg-card shadow-sm"

export default function SyncHub() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">One record, kept in sync everywhere</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Change a client&apos;s address in Halden and it updates in your invoices, calendar invites and shared files within a minute.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li>Two-way sync, with a full change history</li>
          <li>Conflicts flagged for a person to decide, never overwritten</li>
          <li>Pause any connection without losing data</li>
        </ul>
      </div>
      <div className="relative mx-auto flex size-80 items-center justify-center">
        <span className="z-10 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background">Halden</span>
        <OrbitingCircles radius={78} duration={22}>
          <span className={node} role="img" aria-label="Email">
            <Mail aria-hidden="true" className="size-4" />
          </span>
          <span className={node} role="img" aria-label="Calendar">
            <Calendar aria-hidden="true" className="size-4" />
          </span>
        </OrbitingCircles>
        <OrbitingCircles radius={140} duration={34} reverse>
          <span className={node} role="img" aria-label="Invoices">
            <Receipt aria-hidden="true" className="size-4" />
          </span>
          <span className={node} role="img" aria-label="Files">
            <Cloud aria-hidden="true" className="size-4" />
          </span>
          <span className={node} role="img" aria-label="Docs">
            <FileText aria-hidden="true" className="size-4" />
          </span>
          <span className={node} role="img" aria-label="Team chat">
            <MessageSquare aria-hidden="true" className="size-4" />
          </span>
        </OrbitingCircles>
      </div>
    </section>
  )
}
