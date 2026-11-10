import { GridPattern } from "@/registry/default/ui/grid-pattern"

export default function GridPatternDemo() {
  return (
    <div className="relative flex h-56 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background">
      <GridPattern fade highlight={[[3, 1], [5, 2], [8, 1], [10, 3]]} />
      <p className="relative text-lg font-medium">Grid pattern</p>
    </div>
  )
}
