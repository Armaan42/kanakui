import { Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PhotoStack } from "@/registry/default/ui/photo-stack"

export const meta = {
  title: "Shared trip album",
  description: "The photo stack as the cover of a shared album in a group-chat app, beside who's in it and what to do with it.",
}

// Sample photos. Swap in your own. The trip and people are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&auto=format&q=75`

export default function SharedAlbum() {
  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-14 md:grid-cols-2">
      <PhotoStack
        photos={[
          { src: photo("1501785888041-af3ef285b470"), alt: "A rowing boat on a turquoise mountain lake", caption: "Day 2, the lake" },
          { src: photo("1506905925346-21bda4d32df4"), alt: "Snowy peaks above a sea of clouds", caption: "Sunrise from the hut" },
          { src: photo("1464822759023-fed622ff2c3b"), alt: "A wide valley below snow-capped mountains", caption: "The long walk down" },
        ]}
      />
      <div>
        <p className="text-sm text-muted-foreground">Shared album · 214 photos</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Dolomites, June 2026</h1>
        <p className="mt-2 text-muted-foreground">Ana, Jonas, Mei and Tomás added photos. Swipe the stack to flip through the highlights.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>
            <Share2 aria-hidden="true" />
            Share album
          </Button>
          <Button variant="outline">
            <Download aria-hidden="true" />
            Download all
          </Button>
        </div>
      </div>
    </div>
  )
}
