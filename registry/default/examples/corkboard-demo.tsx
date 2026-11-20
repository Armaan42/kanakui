import { Corkboard, type CorkNote } from "@/registry/default/ui/corkboard"

// Sample photos. Swap in your own. The plan is made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=360&fit=crop&auto=format&q=80`

const NOTES: CorkNote[] = [
  { id: "goal", x: 16, y: 10, kind: "card", text: "Spring launch: 14 May", pin: "#dc2626" },
  { id: "venue", x: 50, y: 8, kind: "photo", text: "Venue: Harbour Canteen", src: photo("1517248135467-4c7edcad34c4"), alt: "A restaurant with dark wooden floors, pendant lamps and tall chairs", pin: "#2563eb" },
  { id: "team", x: 82, y: 22, kind: "photo", text: "Launch team", src: photo("1522071820081-009f0129c71c"), alt: "Four people working on laptops around a wooden table", pin: "#16a34a" },
  { id: "copy", x: 24, y: 52, kind: "sticky", text: "Final copy from Ines by Friday", pin: "#ca8a04" },
  { id: "press", x: 62, y: 60, kind: "card", text: "Press list: 40 names, invites out on the 2nd", pin: "#dc2626" },
]

const LINKS: [string, string][] = [
  ["goal", "venue"],
  ["goal", "copy"],
  ["venue", "team"],
  ["copy", "press"],
]

export default function CorkboardDemo() {
  return <Corkboard notes={NOTES} links={LINKS} />
}
