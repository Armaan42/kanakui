import { BorderBeam } from "@/registry/default/ui/border-beam"
import { Marquee } from "@/registry/default/ui/marquee"
import { NumberTicker } from "@/registry/default/ui/number-ticker"

const integrations = ["GitHub", "Slack", "Linear", "Figma", "Notion", "Stripe", "Vercel", "Discord"]

/**
 * Bento grid built from live components: a counter, a scrolling integrations
 * row and a tile with a moving border. Figures and names are placeholders.
 */
export function Bento01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Everything connects</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article className="rounded-xl border bg-card p-6 md:col-span-2">
            <p className="text-sm text-muted-foreground">Projects deployed</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              <NumberTicker value={48210} locale="en-US" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Placeholder figure. Use your real number.</p>
          </article>

          <article className="overflow-hidden rounded-xl border bg-card py-6 md:col-span-4">
            <h3 className="px-6 font-semibold">Works with your tools</h3>
            <p className="mt-1 px-6 text-sm text-muted-foreground">Connect in a few clicks.</p>
            <div className="mt-6 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
              <Marquee duration="30s" gap="0.75rem">
                {integrations.map((name) => (
                  <span key={name} className="rounded-md border bg-background px-3 py-1.5 text-sm whitespace-nowrap">
                    {name}
                  </span>
                ))}
              </Marquee>
            </div>
          </article>

          <article className="relative rounded-xl border bg-card p-6 md:col-span-4">
            <h3 className="font-semibold">Always on</h3>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              Health checks run every minute from several regions, and you hear about problems before your users do.
            </p>
            <div aria-hidden="true" className="mt-6 flex h-10 items-end gap-1">
              {Array.from({ length: 40 }, (_, i) => (
                <span key={i} className={i === 27 ? "h-4 flex-1 rounded-sm bg-amber-500/70" : "h-full flex-1 rounded-sm bg-emerald-500/60"} />
              ))}
            </div>
            <BorderBeam duration="7s" />
          </article>

          <article className="rounded-xl border bg-card p-6 md:col-span-2">
            <h3 className="font-semibold">Private by default</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Data is encrypted at rest and in transit.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
