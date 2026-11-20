import { Meteors } from "@/registry/default/ui/meteors"

export default function MeteorsDemo() {
  return (
    <div className="relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden rounded-xl border bg-card px-6">
      <Meteors count={20} />
      <div className="relative text-center">
        <p className="text-sm text-muted-foreground">Tonight, 12–13 August</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">The Perseids peak</p>
        <p className="mt-2 text-sm text-muted-foreground">Look north-east after midnight, well away from city lights.</p>
      </div>
    </div>
  )
}
