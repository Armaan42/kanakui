import { RetroGrid } from "@/registry/default/ui/retro-grid"

// The event is made up.
export default function RetroGridDemo() {
  return (
    <div className="relative flex h-72 w-full max-w-2xl items-center justify-center overflow-hidden rounded-xl border bg-background px-6">
      <RetroGrid />
      <div className="relative text-center">
        <p className="text-sm text-muted-foreground">Friday 21:00 · The Basement</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight">Synth Night</p>
        <p className="mt-2 text-sm text-muted-foreground">Two DJs, eighties only. Free before ten.</p>
      </div>
    </div>
  )
}
