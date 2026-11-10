import { RetroGrid } from "@/registry/default/ui/retro-grid"

export default function RetroGridDemo() {
  return (
    <div className="relative flex h-72 w-full max-w-2xl items-center justify-center overflow-hidden rounded-xl border bg-background">
      <RetroGrid />
      <p className="relative text-4xl font-semibold tracking-tight">Retro Grid</p>
    </div>
  )
}
