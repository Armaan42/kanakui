import { RetroTv } from "@/registry/default/ui/retro-tv"

// Sample photos. Swap in your own.
const photo = (id: string, w: number, h: number) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const channels = [
  { src: photo("1506905925346-21bda4d32df4", 800, 600), alt: "Snowy peaks above a sea of cloud", name: "Nature Hour" },
  { src: photo("1513407030348-c983a97b98d8", 800, 600), alt: "Tokyo Tower above the city at dusk", name: "City Lights" },
  { src: photo("1504674900247-0877df9cc836", 800, 600), alt: "Plates of food on a wooden table", name: "Cooking Show" },
  { src: photo("1493225457124-a3eb161ffa5f", 800, 600), alt: "A singer on a smoky stage", name: "Live Music" },
]

export default function RetroTvDemo() {
  return <RetroTv channels={channels} />
}
