import { BackgroundBeams } from "@/registry/default/ui/background-beams"

export default function BackgroundBeamsDemo() {
  return (
    <div className="dark relative isolate flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-background px-6 text-foreground">
      <BackgroundBeams />
      <div className="w-full max-w-sm text-center">
        <p className="text-2xl font-semibold tracking-tight sm:text-3xl">The Friday changelog</p>
        <p className="mt-2 text-sm text-muted-foreground">One short email each Friday: what shipped this week and what&apos;s next.</p>
        <div className="mt-5 flex gap-2">
          <label htmlFor="beams-email" className="sr-only">
            Email address
          </label>
          <input id="beams-email" type="email" placeholder="you@company.com" className="h-9 min-w-0 flex-1 rounded-md border bg-background/60 px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50" />
          <button type="button" className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
