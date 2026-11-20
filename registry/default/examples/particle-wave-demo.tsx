import { Play } from "lucide-react"

import { ParticleWave } from "@/registry/default/ui/particle-wave"

// The podcast is made up.
export default function ParticleWaveDemo() {
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-background">
      <ParticleWave className="text-muted-foreground" />
      <div className="absolute inset-x-0 top-5 flex items-center justify-center gap-3 px-6">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play aria-hidden="true" className="size-4 translate-x-px" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Ep. 42: Designing for slow internet</p>
          <p className="text-xs text-muted-foreground">Field Notes podcast · 38 min</p>
        </div>
      </div>
    </div>
  )
}
