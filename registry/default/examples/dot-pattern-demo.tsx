import { DotPattern } from "@/registry/default/ui/dot-pattern"

export default function DotPatternDemo() {
  return (
    <div className="relative flex h-56 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background">
      <DotPattern fade />
      <p className="relative text-lg font-medium">Dot pattern</p>
    </div>
  )
}
