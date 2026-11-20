import { ArrowLeftRight, CalendarDays, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RotatingWords } from "@/registry/default/ui/rotating-words"

export const meta = {
  title: "Flight search hero",
  description: "Rotating words cycling destinations in a travel site's headline, above a real flight search form.",
}

// The airline and fares are made up.
const DEALS = [
  { to: "Lisbon", from: "€49" },
  { to: "Reykjavík", from: "€119" },
  { to: "Marrakesh", from: "€79" },
]

export default function FlightSearch() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Weekend flights to <RotatingWords words={["Lisbon", "Reykjavík", "Kyoto", "Marrakesh"]} className="text-muted-foreground" />
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">Fly Friday, back Sunday night. Fares include a cabin bag.</p>

      <form className="mt-8 grid gap-3 rounded-2xl border bg-card p-4 md:grid-cols-[1fr_auto_1fr_1fr_auto_auto]" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1 text-xs text-muted-foreground">
          From
          <input defaultValue="London (any)" className="bg-transparent text-sm font-medium text-foreground outline-none" />
        </label>
        <button type="button" aria-label="Swap origin and destination" className="hidden self-center rounded-full border p-2 md:block">
          <ArrowLeftRight aria-hidden="true" className="size-4" />
        </button>
        <label className="grid gap-1 text-xs text-muted-foreground">
          To
          <input defaultValue="Anywhere" className="bg-transparent text-sm font-medium text-foreground outline-none" />
        </label>
        <label className="grid gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays aria-hidden="true" className="size-3" />
            Dates
          </span>
          <input defaultValue="Fri 12 – Sun 14 Mar" className="bg-transparent text-sm font-medium text-foreground outline-none" />
        </label>
        <label className="grid gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users aria-hidden="true" className="size-3" />
            Travellers
          </span>
          <input defaultValue="2 adults" className="bg-transparent text-sm font-medium text-foreground outline-none" />
        </label>
        <Button type="submit" size="lg" className="self-center">
          <Search aria-hidden="true" />
          Search
        </Button>
      </form>

      <ul className="mt-6 flex flex-wrap gap-2 text-sm">
        {DEALS.map((deal) => (
          <li key={deal.to} className="rounded-full border px-3 py-1">
            {deal.to} <span className="text-muted-foreground">from {deal.from}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
