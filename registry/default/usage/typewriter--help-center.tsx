import { CreditCard, Package, RotateCcw, Search, UserRound } from "lucide-react"

import { Typewriter } from "@/registry/default/ui/typewriter"

export const meta = {
  title: "Help centre search",
  description: "The typewriter suggesting real questions inside a help centre's search box, with topic links below.",
}

// The shop and help topics are made up.
const TOPICS = [
  { icon: Package, title: "Orders and delivery", count: 18 },
  { icon: RotateCcw, title: "Returns and refunds", count: 11 },
  { icon: CreditCard, title: "Payments", count: 9 },
  { icon: UserRound, title: "Your account", count: 14 },
]

export default function HelpCenter() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-center text-sm text-muted-foreground">Halden Goods help centre</p>
      <h1 className="mt-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl">How can we help?</h1>
      <form role="search" className="mt-8" onSubmit={(event) => event.preventDefault()}>
        <label className="flex h-14 items-center gap-3 rounded-xl border bg-card px-4 shadow-sm focus-within:ring-3 focus-within:ring-ring/50">
          <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          <span className="sr-only">Search help articles</span>
          <span className="relative min-w-0 flex-1">
            <input className="peer w-full bg-transparent outline-none" placeholder=" " />
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-muted-foreground peer-[:not(:placeholder-shown)]:hidden peer-focus:hidden">
              Try&nbsp;
              <Typewriter words={["where is my order?", "how do I return a mug?", "change my delivery address", "use a gift card"]} />
            </span>
          </span>
        </label>
      </form>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {TOPICS.map(({ icon: Icon, title, count }) => (
          <li key={title}>
            <a href="#topic" className="flex items-center gap-3 rounded-xl border p-4 outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50">
              <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
              <span className="flex-1 font-medium">{title}</span>
              <span className="text-sm text-muted-foreground">{count} articles</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
