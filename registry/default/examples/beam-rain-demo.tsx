import { BeamRain } from "@/registry/default/ui/beam-rain"

export default function BeamRainDemo() {
  return (
    <div className="dark relative isolate flex h-80 w-full max-w-2xl items-center justify-center overflow-hidden rounded-xl border bg-background text-foreground">
      <BeamRain />
      <p className="text-3xl font-semibold tracking-tight">Something big is coming</p>
    </div>
  )
}
