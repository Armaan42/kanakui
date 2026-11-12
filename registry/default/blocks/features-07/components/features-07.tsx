import { ScrollDevice } from "@/registry/default/ui/scroll-device"

const bars = [38, 64, 52, 80, 47, 92, 70, 58, 86, 62, 74, 96]

/**
 * A heading above a tilted screen that straightens as it scrolls into view.
 * The screen shows a simple mock dashboard built from divs; replace it with a
 * screenshot or your real UI.
 */
export function Features07() {
  return (
    <section className="overflow-hidden border-b bg-background px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">See everything at a glance</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            One dashboard for the numbers that matter. Swap the mock screen below for your product.
          </p>
        </div>
        <ScrollDevice className="mt-14">
          <div aria-hidden="true" className="flex size-full">
            <div className="hidden w-1/5 space-y-2 border-r p-4 sm:block">
              <div className="h-3 w-2/3 rounded bg-foreground/20" />
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${60 + ((i * 23) % 35)}%` }} />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-3">
                {["Revenue", "Users", "Uptime"].map((label) => (
                  <div key={label} className="rounded-lg border p-3">
                    <div className="h-2 w-1/2 rounded bg-muted" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-foreground/25" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-1.5 rounded-lg border p-3 sm:gap-2 sm:p-4">
                {bars.map((height, i) => (
                  <div key={i} className="flex-1 rounded-t bg-linear-to-t from-violet-500/70 to-sky-400/70" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </ScrollDevice>
      </div>
    </section>
  )
}
