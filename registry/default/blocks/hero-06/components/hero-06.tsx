import { Button } from "@/components/ui/button"
import { ImageCompare } from "@/registry/default/ui/image-compare"

function Placeholder({ variant }: { variant: "before" | "after" }) {
  const after = variant === "after"
  return (
    <div className={after ? "size-full bg-card p-5" : "size-full bg-muted p-5"} aria-hidden="true">
      <div className={after ? "h-3 w-28 rounded bg-foreground/70" : "h-3 w-28 rounded bg-foreground/20"} />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={after ? "h-14 rounded-lg border bg-background shadow-xs" : "h-14 rounded-sm bg-foreground/10"} />
        ))}
      </div>
    </div>
  )
}

/**
 * Hero with a before/after slider that shows your product's effect.
 * Swap the placeholders for two real screenshots of the same size.
 */
export function Hero06() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Same app. Better product.</h1>
          <p className="mt-5 max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
            Drag the divider to see the difference. Describe the change your product makes in one sentence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-10 px-5">
              Try it free
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-5">
              See case studies
            </Button>
          </div>
        </div>
        <ImageCompare
          beforeLabel="Before"
          afterLabel="After"
          defaultPosition={45}
          before={<Placeholder variant="before" />}
          after={<Placeholder variant="after" />}
        />
      </div>
    </section>
  )
}
