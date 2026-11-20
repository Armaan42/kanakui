import { MagnifierLoupe } from "@/registry/default/ui/magnifier-loupe"

// Sample photos. Swap in your own.
const photo = (id: string, w: number, h: number) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function MagnifierLoupeDemo() {
  return <MagnifierLoupe src={photo("1523906834658-6e24ef2386f9", 1600, 1200)} alt="The Rialto Bridge over the Grand Canal in Venice" caption="The Rialto Bridge, Venice" />
}
