import { Aperture, BatteryCharging, Timer, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InstantCamera, type InstantPhoto } from "@/registry/default/ui/instant-camera"

// Photos: Unsplash (free under the Unsplash License). The product is made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format&q=75`

const photos: InstantPhoto[] = [
  { src: photo("1507525428034-b723cf961d3e"), alt: "Gentle waves on a beach at sunrise", caption: "first light" },
  { src: photo("1533105079780-92b9be482077"), alt: "White houses and steps above a blue sea", caption: "the long way down" },
  { src: photo("1504674900247-0877df9cc836"), alt: "Plates of food shared on a wooden table", caption: "sunday lunch" },
  { src: photo("1493225457124-a3eb161ffa5f"), alt: "A singer with one arm raised in stage smoke", caption: "front row" },
]

const features = [
  { icon: Aperture, title: "Three-zone focus", text: "Close-up, portrait and landscape, set with one ring." },
  { icon: Zap, title: "Auto fill flash", text: "Balances the flash against the light in the room." },
  { icon: Timer, title: "Ten-second timer", text: "Enough time to run round and join the picture." },
  { icon: BatteryCharging, title: "USB-C charging", text: "Around 60 packs of film on a full charge." },
]

/** A product showcase with a working instant camera beside its features. */
export function Product01() {
  return (
    <section aria-labelledby="product-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="order-last flex justify-center lg:order-first">
          <InstantCamera photos={photos} defaultTaken={1} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Halo 8 instant camera</p>
          <h2 id="product-01-title" className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            A photo you can hold in a minute.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">
            No app, no account, nothing to charge at the party. Go ahead and press the red button.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button size="lg">Buy for $129</Button>
            <span className="text-sm text-muted-foreground">Free shipping. Film sold separately.</span>
          </div>
          <dl className="mt-11 grid gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title}>
                <dt className="flex items-center gap-2 font-medium">
                  <feature.icon aria-hidden="true" className="size-4 text-muted-foreground" />
                  {feature.title}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground">{feature.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
