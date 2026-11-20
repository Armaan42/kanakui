import { ArrowRight, CalendarClock, Layers, Wand2 } from "lucide-react"

import { GlowBorderButton } from "@/registry/default/ui/glow-border-button"

export const meta = {
  title: "Early access section",
  description: "The glow border button as the one call to action in a dark early-access section for an upcoming product.",
}

// The product and dates are made up.
export default function EarlyAccess() {
  return (
    <section className="dark bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <p className="text-sm text-muted-foreground">Halden Studio 2 · opens to everyone in March</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Edit a whole photo shoot in the time it takes to edit one.</h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Make one edit, and Studio applies it to every photo from the same light. Early access is free while we&apos;re in beta.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GlowBorderButton>
              Request early access
              <ArrowRight aria-hidden="true" />
            </GlowBorderButton>
            <span className="text-sm text-muted-foreground">About a week&apos;s wait right now.</span>
          </div>
        </div>
        <ul className="grid gap-3">
          {[
            { icon: Layers, title: "Batch edits by light", text: "Groups photos by scene and colour temperature automatically." },
            { icon: Wand2, title: "Masks that follow people", text: "Brighten a face once; it stays brightened across the set." },
            { icon: CalendarClock, title: "Deliver the same day", text: "Export, watermark and send a client gallery in one step." },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-xl border bg-card p-5">
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <span>
                <span className="block font-medium">{title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
