import { ScrambleText } from "@/registry/default/ui/scramble-text"

export default function ScrambleTextDemo() {
  return (
    <div className="space-y-3 text-center">
      <ScrambleText as="h2" text="ACCESS GRANTED" className="text-3xl font-semibold tracking-widest" />
      <p className="text-sm text-muted-foreground">
        Hover me: <ScrambleText trigger="hover" text="decrypting…" className="text-foreground" />
      </p>
    </div>
  )
}
