import { SkeletonShimmer, SkeletonText } from "@/registry/default/ui/skeleton-shimmer"

export default function SkeletonShimmerDemo() {
  return (
    <div aria-busy="true" className="flex w-full max-w-sm items-start gap-4 rounded-xl border bg-card p-5">
      <span className="sr-only">Loading profile…</span>
      <SkeletonShimmer className="size-12 shrink-0 rounded-full" />
      <SkeletonText lines={3} className="flex-1" />
    </div>
  )
}
