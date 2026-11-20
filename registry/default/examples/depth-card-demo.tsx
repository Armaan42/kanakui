import { ArrowRight } from "lucide-react"

import { DepthCard, DepthCardItem } from "@/registry/default/ui/depth-card"

// Photo: Unsplash (free under the Unsplash License).
const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=560&fit=crop&auto=format&q=80"

export default function DepthCardDemo() {
  return (
    <DepthCard className="w-[min(26rem,calc(100vw-3rem))] rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
      <DepthCardItem depth={50}>
        <h3 className="text-xl font-semibold tracking-tight">Sunrise above the clouds</h3>
      </DepthCardItem>
      <DepthCardItem depth={60} className="mt-2">
        <p className="text-sm leading-6 text-muted-foreground">
          Six hut-to-hut routes in the Alps where you wake above the cloud line, with timings and what to pack.
        </p>
      </DepthCardItem>
      <DepthCardItem depth={100} className="relative mt-5">
        <img
          src={PHOTO}
          alt="Snowy mountain peaks rising above a sea of clouds at sunset."
          width={900}
          height={560}
          className="aspect-[16/10] w-full rounded-xl object-cover shadow-none transition-shadow duration-500 group-data-active/depth-card:shadow-2xl group-data-active/depth-card:shadow-black/25"
        />
        <DepthCardItem depth={40} className="absolute top-3 left-3">
          <span className="rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">Above the clouds</span>
        </DepthCardItem>
      </DepthCardItem>
      <div className="mt-6 flex items-center justify-between transform-3d">
        <DepthCardItem depth={30} x={-8}>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Read the guide <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </DepthCardItem>
        <DepthCardItem depth={30} x={8}>
          <a href="#" className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Save route
          </a>
        </DepthCardItem>
      </div>
    </DepthCard>
  )
}
