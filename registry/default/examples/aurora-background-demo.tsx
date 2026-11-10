import { AuroraBackground } from "@/registry/default/ui/aurora-background"

export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="flex h-64 w-full max-w-xl items-center justify-center rounded-xl border bg-card">
      <p className="text-3xl font-semibold tracking-tight">Northern lights</p>
    </AuroraBackground>
  )
}
