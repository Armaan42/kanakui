import { BorderBeam } from "@/registry/default/ui/border-beam"

export default function BorderBeamDemo() {
  return (
    <div className="relative w-full max-w-sm rounded-xl border bg-card p-6">
      <p className="text-sm font-medium text-muted-foreground">Deployment</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">Building…</p>
      <p className="mt-1 text-sm text-muted-foreground">The light keeps moving while work is in progress.</p>
      <BorderBeam />
    </div>
  )
}
