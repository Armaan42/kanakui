import { BarChart3, Globe, ShieldCheck, Zap } from "lucide-react"

import { BorderBeam } from "@/registry/default/ui/border-beam"

/**
 * Bento grid of four features in different tile sizes. The large tile has a
 * moving border to draw attention. Replace the copy and the visual placeholders.
 */
export function Features02() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Built for teams that ship every day
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <article className="relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 md:col-span-2 md:row-span-2">
            <div>
              <Zap aria-hidden="true" className="size-5" />
              <h3 className="mt-4 text-xl font-semibold tracking-tight">Instant previews</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Every change gets its own link, so reviews happen on the real thing instead of screenshots.
              </p>
            </div>
            <div aria-hidden="true" className="mt-8 grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 rounded-md border bg-muted/40 sm:h-20" />
              ))}
            </div>
            <BorderBeam duration="8s" />
          </article>
          <article className="rounded-xl border bg-card p-6">
            <Globe aria-hidden="true" className="size-5" />
            <h3 className="mt-4 font-semibold">Global by default</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Served close to your users in every region.</p>
          </article>
          <article className="rounded-xl border bg-card p-6">
            <ShieldCheck aria-hidden="true" className="size-5" />
            <h3 className="mt-4 font-semibold">Safe rollbacks</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Undo a bad release in one click.</p>
          </article>
          <article className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:flex-row sm:items-center md:col-span-3">
            <BarChart3 aria-hidden="true" className="size-5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold">Analytics that answer questions</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">See what changed, for whom, and whether it helped.</p>
            </div>
            <div aria-hidden="true" className="flex h-12 items-end gap-1 sm:w-48">
              {[30, 55, 40, 70, 50, 85, 65, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-foreground/15" style={{ height: `${h}%` }} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
