import { Marquee3d } from "@/registry/default/ui/marquee-3d"

const tiles = Array.from({ length: 16 }, (_, i) => (
  <div key={i} className="h-28 w-40 rounded-lg border bg-card p-3">
    <div className="h-2 w-12 rounded bg-muted" />
    <div className="mt-2 h-2 w-20 rounded bg-muted" />
    <p className="mt-6 font-mono text-xs text-muted-foreground">Screen {i + 1}</p>
  </div>
))

export default function Marquee3dDemo() {
  return <Marquee3d items={tiles} className="max-w-3xl" />
}
