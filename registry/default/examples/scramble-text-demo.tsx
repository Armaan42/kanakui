import { ScrambleText } from "@/registry/default/ui/scramble-text"

// The flight is made up.
export default function ScrambleTextDemo() {
  return (
    <div className="space-y-2 text-center">
      <p className="text-sm text-muted-foreground">Flight VN 284 to Lisbon</p>
      <ScrambleText as="h2" text="Gate changed to B32" className="text-3xl font-semibold tracking-tight" />
      <p className="text-sm text-muted-foreground">
        Boarding at <ScrambleText trigger="hover" text="18:40" className="font-medium text-foreground tabular-nums" />
      </p>
    </div>
  )
}
