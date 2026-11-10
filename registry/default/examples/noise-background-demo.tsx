import { NoiseBackground } from "@/registry/default/ui/noise-background"

export default function NoiseBackgroundDemo() {
  return (
    <div className="relative flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-xl border bg-linear-to-br from-muted to-card">
      <NoiseBackground intensity={0.25} />
      <p className="relative text-xl font-semibold tracking-tight">Film grain</p>
    </div>
  )
}
