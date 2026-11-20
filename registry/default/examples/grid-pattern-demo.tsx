import { GridPattern } from "@/registry/default/ui/grid-pattern"

export default function GridPatternDemo() {
  return (
    <div className="relative flex h-60 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background px-6">
      <GridPattern fade highlight={[[3, 1], [5, 2], [8, 1], [10, 3]]} />
      <div className="relative rounded-lg border bg-card/90 px-5 py-4 text-center shadow-sm backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">Floor 3, today</p>
        <p className="mt-1 text-lg font-semibold">4 desks free</p>
        <button type="button" className="mt-3 h-8 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Book a desk
        </button>
      </div>
    </div>
  )
}
