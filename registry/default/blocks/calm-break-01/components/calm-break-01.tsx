import { MusicBox } from "@/registry/default/ui/music-box"
import { ZenGarden } from "@/registry/default/ui/zen-garden"

/** A two-minute break: rake a sand garden, follow a breathing circle and wind a music box. */
export function CalmBreak01() {
  return (
    <section aria-labelledby="calm-break-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="calm-break-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Take two minutes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Rake the sand, breathe with the circle, or wind the music box. Your work will still be there when you get back.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <ZenGarden className="max-w-none" />

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6 rounded-2xl border p-6">
              <div aria-hidden="true" className="relative grid size-28 shrink-0 place-items-center">
                <span className="absolute inset-0 rounded-full bg-sky-500/10" />
                <span className="absolute inset-0 animate-calm-break-01-breathe rounded-full bg-sky-500/25 motion-reduce:scale-75 motion-reduce:animate-none" />
                <span className="relative size-3 rounded-full bg-sky-600" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  <span aria-hidden="true" className="relative inline-grid motion-reduce:hidden">
                    <span className="col-start-1 row-start-1 animate-calm-break-01-in">Breathe in</span>
                    <span className="col-start-1 row-start-1 animate-calm-break-01-out">Breathe out</span>
                  </span>
                  <span className="sr-only">Breathe in for four seconds, then out for six.</span>
                  <span aria-hidden="true" className="hidden motion-reduce:inline">
                    In for four, out for six
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">In as the circle grows for four seconds, out as it shrinks for six.</p>
              </div>
            </div>

            <MusicBox className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
