import { ScratchCard } from "@/registry/default/ui/scratch-card"

export default function ScratchCardDemo() {
  return (
    <ScratchCard className="w-[min(22rem,calc(100vw-3rem))]">
      <div className="flex aspect-[16/9] flex-col items-center justify-center gap-1 bg-linear-to-br from-amber-100 via-rose-100 to-violet-100 p-6 text-center text-neutral-900">
        <p className="text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase">You won</p>
        <p className="text-4xl font-bold tracking-tight">Free shipping</p>
        <p className="font-mono text-sm tracking-widest">SHIPFREE26</p>
      </div>
    </ScratchCard>
  )
}
