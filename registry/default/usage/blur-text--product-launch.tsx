import { Button } from "@/components/ui/button"
import { BlurText } from "@/registry/default/ui/blur-text"

export const meta = {
  title: "Product launch hero",
  description: "Blur text as the headline of a product launch page, coming into focus word by word above the product photo.",
}

// Sample photo. Swap in your own. The product is made up.
const PHOTO = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&h=800&fit=crop&auto=format&q=80"

export default function ProductLaunch() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
      <p className="text-sm text-muted-foreground">Field Headphones · available 2 December</p>
      <BlurText as="h1" text="Forty hours of quiet on one charge" className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl" />
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        Noise cancelling that adapts to the room, ear cushions you forget you&apos;re wearing, and a case that fits in a coat pocket.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg">Pre-order for $189</Button>
        <Button size="lg" variant="outline">
          Compare models
        </Button>
      </div>
      <img src={PHOTO} alt="Black over-ear headphones on a yellow background" width={1400} height={800} className="mt-12 aspect-[7/4] w-full rounded-2xl object-cover" />
    </section>
  )
}
