import { Button } from "@/components/ui/button"
import { Marquee3d } from "@/registry/default/ui/marquee-3d"

export const meta = {
  title: "Photographer portfolio hero",
  description: "The 3D marquee as a moving wall of work behind a travel photographer's portfolio introduction.",
}

// Sample photos. Swap in your own. The photographer is made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=320&h=224&fit=crop&auto=format&q=70`
const SHOTS = [
  { id: "1493976040374-85c8e12f0c0e", alt: "A pagoda at the end of an old street in Kyoto" },
  { id: "1478436127897-769e1b3f0f36", alt: "A tunnel of red torii gates" },
  { id: "1490806843957-31f4c9a91c65", alt: "Mount Fuji framed by cherry blossoms" },
  { id: "1476610182048-b716b8518aae", alt: "A waterfall over green cliffs" },
  { id: "1531366936337-7c912a4589a7", alt: "Northern lights over snow" },
  { id: "1504893524553-b855bce32c67", alt: "A river winding through a mossy canyon" },
  { id: "1513407030348-c983a97b98d8", alt: "Tokyo Tower above the city at dusk" },
  { id: "1501785888041-af3ef285b470", alt: "A rowing boat on a turquoise mountain lake" },
]

const tiles = [...SHOTS, ...SHOTS].map((shot, i) => (
  <img key={i} src={photo(shot.id)} alt={i < SHOTS.length ? shot.alt : ""} width={320} height={224} className="h-28 w-40 rounded-lg border object-cover" />
))

export default function PhotographerPortfolio() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="text-sm text-muted-foreground">Ana Ribeiro · travel and landscape</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Ten years of slow travel, one frame at a time</h1>
        <p className="mt-4 text-lg text-muted-foreground">Prints, licensing and commissions for hotels, magazines and tourism boards.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">See the archive</Button>
          <Button size="lg" variant="outline">
            Commission a shoot
          </Button>
        </div>
      </div>
      <Marquee3d items={tiles} className="h-[28rem]" />
    </section>
  )
}
