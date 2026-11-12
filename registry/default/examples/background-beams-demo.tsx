import { BackgroundBeams } from "@/registry/default/ui/background-beams"

export default function BackgroundBeamsDemo() {
  return (
    <div className="dark relative isolate flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-background text-foreground">
      <BackgroundBeams />
      <div className="text-center">
        <p className="text-3xl font-semibold tracking-tight">Join the waitlist</p>
        <p className="mt-2 text-sm text-muted-foreground">Light travels along every beam.</p>
      </div>
    </div>
  )
}
