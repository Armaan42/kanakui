import { Corkboard } from "@/registry/default/ui/corkboard"

export const meta = {
  title: "Café opening plan",
  description: "The corkboard as the planning board in a small business's project space, with the tasks for opening day joined up.",
}

// Sample photo. Swap in your own. The café, people and dates are made up.
const NOTES = [
  { id: "open", x: 16, y: 14, kind: "card" as const, text: "Opening day: Sat 6 March", pin: "#dc2626" },
  {
    id: "room",
    x: 52,
    y: 12,
    kind: "photo" as const,
    text: "The room, before paint",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=320&h=240&fit=crop&auto=format&q=75",
    alt: "A restaurant with dark wooden floors, pendant lamps and tall chairs",
    pin: "#2563eb",
  },
  { id: "menu", x: 82, y: 50, kind: "sticky" as const, text: "Menu tasting with Tomás, Tue", pin: "#ca8a04" },
  { id: "staff", x: 24, y: 58, kind: "sticky" as const, text: "Hire two baristas", pin: "#16a34a" },
  { id: "flyers", x: 56, y: 66, kind: "card" as const, text: "Flyers to the market stalls", pin: "#7c3aed" },
]

const LINKS: [string, string][] = [
  ["open", "room"],
  ["open", "staff"],
  ["room", "menu"],
  ["staff", "flyers"],
]

export default function CafeOpening() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Kiln Corner Café · Projects</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Getting ready to open</h1>
      <p className="mt-2 text-muted-foreground">Drag the notes around as plans change. The string shows what depends on what.</p>
      <Corkboard className="mt-8" notes={NOTES} links={LINKS} />
    </div>
  )
}
