import { FoldingMap } from "@/registry/default/ui/folding-map"

export const meta = {
  title: "Festival site map",
  description: "The folding map in a music festival's app, unfolding to show the stages, food and first aid on site.",
}

// The festival and site are made up. The map is drawn in a 600 × 400 space.
const PLACES = [
  { x: 150, y: 110, name: "Main Stage", color: "#dc2626" },
  { x: 430, y: 90, name: "Woodland Stage", color: "#7c3aed" },
  { x: 300, y: 210, name: "Food Court", color: "#ca8a04" },
  { x: 470, y: 280, name: "First Aid", color: "#16a34a" },
  { x: 120, y: 320, name: "Entrance", color: "#2563eb" },
]

function SiteMap() {
  return (
    <>
      <rect width="600" height="400" fill="#eef2e3" />
      <path d="M360 0C380 60 420 110 520 120C580 126 600 150 600 150V0Z" fill="#c9dcb0" />
      <path d="M0 380C120 360 260 380 380 350C470 330 540 360 600 340V400H0Z" fill="#b8d8e6" />
      <g fill="none" stroke="#d6cbb2" strokeWidth="10" strokeLinecap="round">
        <path d="M120 320C160 260 220 230 300 210C380 190 430 130 430 90" />
        <path d="M150 110C200 160 250 190 300 210C380 240 430 260 470 280" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
        <path d="M120 320C160 260 220 230 300 210C380 190 430 130 430 90" />
        <path d="M150 110C200 160 250 190 300 210C380 240 430 260 470 280" />
      </g>
      <text x="470" y="40" fontSize="12" fill="#4d7c0f" fontStyle="italic" fontFamily="system-ui, sans-serif">
        The woods
      </text>
      <text x="260" y="385" fontSize="13" fill="#2b6f8a" fontStyle="italic" fontFamily="Georgia, serif">
        Lake
      </text>
      {PLACES.map((place) => (
        <g key={place.name}>
          <circle cx={place.x} cy={place.y} r="10" fill={place.color} stroke="#fff" strokeWidth="2" />
          <text x={place.x + 16} y={place.y + 5} fontSize="14" fontWeight="600" fill="#3f3a2e" fontFamily="system-ui, sans-serif">
            {place.name}
          </text>
        </g>
      ))}
    </>
  )
}

const TIMES = [
  ["Main Stage", "Gates 12:00 · Last act 23:00"],
  ["Woodland Stage", "Acoustic sets from 14:00"],
  ["Food Court", "Open 11:00 to 01:00"],
]

export default function FestivalMap() {
  return (
    <div className="mx-auto max-w-4xl overflow-x-clip px-6 py-12">
      <p className="text-sm text-muted-foreground">Brightwater Fields · 18–20 June</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Find your way around</h1>
      <p className="mt-2 text-muted-foreground">Open the map. It works without signal, so save it before you arrive.</p>
      <FoldingMap className="mt-8" title="Site map" subtitle="Brightwater Fields 2027">
        <SiteMap />
      </FoldingMap>
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
        {TIMES.map(([place, hours]) => (
          <div key={place}>
            <dt className="font-medium">{place}</dt>
            <dd className="text-muted-foreground">{hours}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
