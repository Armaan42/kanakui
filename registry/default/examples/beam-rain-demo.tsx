import { BeamRain } from "@/registry/default/ui/beam-rain"

export default function BeamRainDemo() {
  return (
    <div className="dark relative isolate flex h-80 w-full max-w-2xl items-center justify-center overflow-hidden rounded-xl border bg-background px-6 text-foreground">
      <BeamRain />
      <div className="max-w-md text-center">
        <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">Sunday, 02:00 to 03:00 UTC</p>
        <p className="mt-3 text-sm text-muted-foreground">The dashboard will be read-only for an hour. The API and webhooks stay up.</p>
      </div>
    </div>
  )
}
