import { AuroraBackground } from "@/registry/default/ui/aurora-background"

// The forecast is made up.
export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="flex h-64 w-full max-w-xl items-center justify-center rounded-xl border bg-card px-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Aurora forecast · Tromsø</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">Good chance tonight</p>
        <p className="mt-2 text-sm text-muted-foreground">Kp 5, clear skies after 22:00. Best views away from the city.</p>
      </div>
    </AuroraBackground>
  )
}
