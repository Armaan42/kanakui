import { BarLoader } from "@/registry/default/ui/bar-loader"

export default function BarLoaderDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <BarLoader label="Loading results" className="rounded-none" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>
  )
}
