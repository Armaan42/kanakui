import { NoiseBackground } from "@/registry/default/ui/noise-background"

// The studio is made up.
export default function NoiseBackgroundDemo() {
  return (
    <div className="relative flex h-60 w-full max-w-md items-center justify-center overflow-hidden rounded-xl border bg-linear-to-br from-muted to-card px-6">
      <NoiseBackground intensity={0.25} />
      <div className="relative text-center">
        <p className="text-xl font-semibold tracking-tight">Darkroom open studio</p>
        <p className="mt-1 text-sm text-muted-foreground">Thursdays, 6 to 9 pm. Bring your own film; chemicals are on us.</p>
      </div>
    </div>
  )
}
