import { FilmStrip } from "@/registry/default/ui/film-strip"

// Sample photos. Swap in your own.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&h=600&fit=crop&auto=format&q=75`

export default function FilmStripDemo() {
  return (
    <FilmStrip
      frames={[
        { src: photo("1506905925346-21bda4d32df4"), alt: "Snowy peaks above a sea of cloud", caption: "Above the inversion" },
        { src: photo("1464822759023-fed622ff2c3b"), alt: "A wide valley below snow-capped mountains", caption: "The long valley" },
        { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake", caption: "Far shore" },
        { src: photo("1531366936337-7c912a4589a7"), alt: "Northern lights over snow", caption: "Past midnight" },
        { src: photo("1476610182048-b716b8518aae"), alt: "A waterfall over green cliffs", caption: "After the rain" },
      ]}
    />
  )
}
