import { Meteors } from "@/registry/default/ui/meteors"

export default function MeteorsDemo() {
  return (
    <div className="relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden rounded-xl border bg-card">
      <Meteors count={20} />
      <div className="relative text-center">
        <p className="text-2xl font-semibold tracking-tight">Launch week</p>
        <p className="text-sm text-muted-foreground">Something new every day.</p>
      </div>
    </div>
  )
}
