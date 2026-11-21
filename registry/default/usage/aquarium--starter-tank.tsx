import { Button } from "@/components/ui/button"
import { Aquarium } from "@/registry/default/ui/aquarium"

export const meta = {
  title: "Aquarium shop product page",
  description: "The aquarium as a live preview on a fish shop's starter-kit page, with the fish in the kit swimming about.",
}

// The shop, kit and prices are made up.
const FISH = [
  { name: "Harlequin rasbora", color: "#e8742c" },
  { name: "Golden pencilfish", color: "#e9c46a" },
  { name: "Glowlight tetra", color: "#d97b6c" },
  { name: "Pygmy corydoras", color: "#cfd8c6" },
]

export default function StarterTank() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <Aquarium fish={FISH.map((f) => f.color)} />
      <div>
        <p className="text-sm text-muted-foreground">Tidewell Aquatics · Starter kits</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">The 60 litre community tank</h1>
        <p className="mt-2 text-muted-foreground">A planted tank with a quiet filter, a day and night light, and a mix of small, peaceful fish that get along.</p>
        <p className="mt-4 text-2xl font-semibold">€149</p>
        <h2 className="mt-6 text-sm font-medium">Fish in the kit</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {FISH.map((f) => (
            <li key={f.name} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3 rounded-full" style={{ backgroundColor: f.color }} />
              {f.name}
            </li>
          ))}
        </ul>
        <Button className="mt-6">Add to basket</Button>
        <p className="mt-3 text-xs text-muted-foreground">Fish are collected in store once the tank has settled, usually after two weeks.</p>
      </div>
    </div>
  )
}
