import { ParticleWave } from "@/registry/default/ui/particle-wave"

export default function ParticleWaveDemo() {
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-background">
      <ParticleWave className="text-muted-foreground" />
      <p className="absolute inset-x-0 top-6 text-center text-xl font-semibold tracking-tight">Signals, not noise</p>
    </div>
  )
}
