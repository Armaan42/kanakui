import { PolaroidStack } from "@/registry/default/ui/polaroid-stack"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&auto=format&q=80`

export default function PolaroidStackDemo() {
  return (
    <PolaroidStack
      className="w-[min(18rem,calc(100vw-4rem))]"
      photos={[
        { src: photo("1493976040374-85c8e12f0c0e"), alt: "A pagoda at the end of an old street in Kyoto at dusk", caption: "Kyoto, golden hour" },
        { src: photo("1476610182048-b716b8518aae"), alt: "A waterfall over green cliffs at sunset", caption: "chasing waterfalls" },
        { src: photo("1490806843957-31f4c9a91c65"), alt: "Mount Fuji framed by cherry blossoms", caption: "Fuji finally showed up!" },
        { src: photo("1531366936337-7c912a4589a7"), alt: "Green and purple northern lights over snow", caption: "2 am, worth it" },
        { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake below mountains", caption: "lake day" },
      ]}
    />
  )
}
