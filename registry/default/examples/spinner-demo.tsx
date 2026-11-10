import { Spinner } from "@/registry/default/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" className="text-muted-foreground" />
      <button type="button" disabled className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground opacity-80">
        <Spinner size="sm" label="Saving" />
        Saving
      </button>
    </div>
  )
}
