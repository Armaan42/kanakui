import { FilmStrip, type FilmFrame } from "@/registry/default/ui/film-strip"

// Sample photos. Swap in your own. The photographer is made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&h=600&fit=crop&auto=format&q=75`

const frames: FilmFrame[] = [
  { src: photo("1506905925346-21bda4d32df4"), alt: "Snowy peaks rising above a sea of cloud at sunrise", caption: "Above the inversion, 5:40 am" },
  { src: photo("1464822759023-fed622ff2c3b"), alt: "A wide glacial valley below snow-capped mountains", caption: "The long valley" },
  { src: photo("1469474968028-56623f02e42e"), alt: "A lone hiker on a rock above misty green hills", caption: "Last light on the ridge" },
  { src: photo("1531366936337-7c912a4589a7"), alt: "Green and purple northern lights over snow", caption: "Two hours past midnight" },
  { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake below mountains", caption: "Boats at the far shore" },
  { src: photo("1476610182048-b716b8518aae"), alt: "A waterfall over green cliffs at sunset", caption: "The falls after rain" },
]

const details = [
  { label: "Camera", value: "35mm rangefinder" },
  { label: "Film", value: "ISO 400 colour negative" },
  { label: "Shot over", value: "Three summers" },
]

/** A photo series: a contact strip of negatives that develop into a print. */
export function Gallery01() {
  return (
    <section aria-labelledby="gallery-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-sm text-muted-foreground">Photo series</p>
          <h2 id="gallery-01-title" className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Field notes from the high country
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            One roll at a time, walked in and carried out. Pick a frame on the strip to develop it.
          </p>
          <dl className="mt-8 divide-y border-y text-sm">
            {details.map((item) => (
              <div key={item.label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{item.label}</dt>
                <dd className="text-right font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <FilmStrip frames={frames} className="mx-auto" />
      </div>
    </section>
  )
}
