"use client"

import type * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { InstantCamera } from "@/registry/default/ui/instant-camera"
import { LightSwitchPanel } from "@/registry/default/ui/light-switch-panel"
import { Matchbox } from "@/registry/default/ui/matchbox"
import { PostageStamp } from "@/registry/default/ui/postage-stamp"
import { VinylPlayer } from "@/registry/default/ui/vinyl-player"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string, w: number, h = w) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`

interface DeskItemProps {
  name: string
  title: string
  /** Size on the desk: these are full components, shrunk to fit. */
  zoom: number
  /** Where it sits on the desk at extra-large widths. */
  place: string
  tilt?: number
  children: React.ReactNode
}

/** One object on the desk, with a tag that links to its page. */
function DeskItem({ name, title, zoom, place, tilt = 0, children }: DeskItemProps) {
  return (
    <figure className={cn("flex shrink-0 snap-center flex-col items-center gap-3 xl:absolute", place)}>
      <div style={{ zoom, rotate: `${tilt}deg` }}>{children}</div>
      <figcaption>
        <Link
          href={`/components/${name}`}
          className="inline-flex items-center gap-1 rounded-full border bg-background/90 px-2.5 py-1 font-mono text-[11px] text-muted-foreground shadow-xs outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {title}
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </figcaption>
    </figure>
  )
}

/**
 * A workbench of real, working VenusUI components. On large screens they're
 * laid out like objects on a cutting mat; below 1280px they become a row
 * you can swipe through.
 */
export function HeroDesk() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
      <div
        role="region"
        aria-label="Live components to try"
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-[#f3f1ec] dark:bg-[#1b1a18]",
          // A cutting mat: a fine grid with a heavier line every fifth square.
          "bg-[linear-gradient(to_right,rgb(0_0_0/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.045)_1px,transparent_1px),linear-gradient(to_right,rgb(0_0_0/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.06)_1px,transparent_1px)] bg-size-[24px_24px,24px_24px,120px_120px,120px_120px]",
          "dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)]"
        )}
      >
        <div className="flex snap-x snap-mandatory items-end gap-10 overflow-x-auto px-6 pt-10 pb-8 [scrollbar-width:thin] xl:block xl:h-[34rem] xl:overflow-visible xl:p-0">
          <DeskItem name="instant-camera" title="Instant Camera" zoom={0.74} place="xl:top-8 xl:left-[3%]" tilt={-2}>
            <InstantCamera
              defaultTaken={1}
              photos={[
                { src: photo("1507525428034-b723cf961d3e", 500), alt: "Gentle waves on a beach at sunrise", caption: "first light" },
                { src: photo("1533105079780-92b9be482077", 500), alt: "White houses above a blue sea", caption: "the long way down" },
                { src: photo("1493976040374-85c8e12f0c0e", 500), alt: "A pagoda at the end of an old street in Kyoto", caption: "kyoto, dusk" },
              ]}
            />
          </DeskItem>
          <DeskItem name="matchbox" title="Matchbox" zoom={0.86} place="xl:top-12 xl:left-[26%]" tilt={3}>
            <Matchbox />
          </DeskItem>
          <DeskItem name="postage-stamp" title="Postage Stamp" zoom={0.82} place="xl:bottom-8 xl:left-[49%]" tilt={-6}>
            <PostageStamp
              src={photo("1523906834658-6e24ef2386f9", 420, 525)}
              alt="The Rialto Bridge over the Grand Canal"
              title="Venice"
              country="Italy"
              value="€1.30"
              postmark={{ place: "Venezia", date: "27 JUN 26" }}
            />
          </DeskItem>
          <DeskItem name="light-switch-panel" title="Light Switch Panel" zoom={0.68} place="xl:top-8 xl:left-[55%]" tilt={1}>
            <LightSwitchPanel
              switches={[
                { id: "desk", label: "Desk", defaultOn: true },
                { id: "shelf", label: "Shelf" },
                { id: "porch", label: "Porch", defaultOn: true },
              ]}
            />
          </DeskItem>
          <DeskItem name="vinyl-player" title="Vinyl Player" zoom={0.62} place="xl:right-[3%] xl:bottom-6" tilt={-1}>
            <VinylPlayer
              className="w-[26rem]"
              title="Tidal Bloom"
              artist="Mara Lune"
              cover={{ src: photo("1557672172-298e090bd0f1", 400), alt: "Album cover: swirls of pink and teal paint" }}
            />
          </DeskItem>
        </div>
      </div>
    </div>
  )
}
