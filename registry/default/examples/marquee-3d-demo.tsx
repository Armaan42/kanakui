import { Marquee3d } from "@/registry/default/ui/marquee-3d"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=320&h=224&fit=crop&auto=format&q=70`

const SHOTS = [
  { id: "1493976040374-85c8e12f0c0e", alt: "A pagoda at the end of an old street in Kyoto" },
  { id: "1478436127897-769e1b3f0f36", alt: "A tunnel of red torii gates" },
  { id: "1490806843957-31f4c9a91c65", alt: "Mount Fuji framed by cherry blossoms" },
  { id: "1476610182048-b716b8518aae", alt: "A waterfall over green cliffs" },
  { id: "1531366936337-7c912a4589a7", alt: "Northern lights over snow" },
  { id: "1504893524553-b855bce32c67", alt: "A river winding through a mossy canyon" },
  { id: "1528360983277-13d401cdc186", alt: "A red paper lantern in a narrow alley" },
  { id: "1540959733332-eab4deabeeaf", alt: "A neon-lit shopping street" },
]

const tiles = [...SHOTS, ...SHOTS].map((shot, i) => (
  <img key={i} src={photo(shot.id)} alt={i < SHOTS.length ? shot.alt : ""} width={320} height={224} className="h-28 w-40 rounded-lg border object-cover" />
))

export default function Marquee3dDemo() {
  return <Marquee3d items={tiles} className="max-w-3xl" />
}
