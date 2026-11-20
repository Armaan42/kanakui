import { RevealCard } from "@/registry/default/ui/reveal-card"

// Sample photos. Swap in your own. The listing is made up.
const PHOTO = "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop&auto=format&q=80"

export default function RevealCardDemo() {
  return (
    <RevealCard
      title="Mountain cabin"
      media={<img src={PHOTO} alt="A dark timber cabin on a hillside above a valley at sunset" width={800} height={600} className="size-full object-cover" />}
    >
      <p>Two bedrooms, wood stove, and a view of the valley. Available from March.</p>
      <a href="#" className="mt-3 inline-block font-medium text-foreground underline underline-offset-4">
        View details
      </a>
    </RevealCard>
  )
}
