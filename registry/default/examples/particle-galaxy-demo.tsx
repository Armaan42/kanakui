import { ParticleGalaxy } from "@/registry/default/ui/particle-galaxy"

export default function ParticleGalaxyDemo() {
  return (
    <div className="dark w-full overflow-hidden rounded-xl border bg-background">
      <ParticleGalaxy className="h-80" count={30000} />
    </div>
  )
}
