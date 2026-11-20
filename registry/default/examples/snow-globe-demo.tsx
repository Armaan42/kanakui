import { SnowGlobe } from "@/registry/default/ui/snow-globe"

// Sample photos. Swap in your own.
const photo = (id: string, w: number, h: number) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function SnowGlobeDemo() {
  return <SnowGlobe src={photo("1464822759023-fed622ff2c3b", 600, 600)} alt="A valley below snowy mountains" label="Alpine 2026" />
}
