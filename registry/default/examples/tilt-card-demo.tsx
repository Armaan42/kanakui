import { TiltCard } from "@/registry/default/ui/tilt-card"

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-72 p-6">
      <div className="h-32 rounded-lg bg-linear-to-br from-violet-500 to-sky-400" />
      <p className="mt-4 font-medium">Move your pointer over me</p>
      <p className="mt-1 text-sm text-muted-foreground">The card tilts toward it and catches the light.</p>
    </TiltCard>
  )
}
