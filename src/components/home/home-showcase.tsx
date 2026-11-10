import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { ComponentPreview } from "@/components/site/component-preview"
import { getItem } from "@/lib/registry"
import { cn } from "@/lib/utils"

/**
 * Live previews of a hand-picked set of components in a bento grid. Each
 * preview loads its code only when scrolled near, so the 3D globe's WebGL
 * code isn't downloaded unless someone reaches this section.
 */
const TILES = [
  { name: "dotted-globe", className: "lg:row-span-2", preview: "h-72 lg:h-full" },
  { name: "image-compare", className: "lg:col-span-2", preview: "h-72 [&_[data-slot=image-compare]]:max-w-md" },
  { name: "dock", preview: "h-56" },
  { name: "number-ticker", preview: "h-56" },
  { name: "marquee", className: "lg:col-span-2", preview: "h-56" },
  { name: "text-3d", preview: "h-56 [&_[data-slot=text-3d]]:text-5xl" },
  { name: "segmented-control", preview: "h-56" },
  { name: "typewriter", preview: "h-56 [&_p]:text-2xl" },
  { name: "shimmer-button", preview: "h-56" },
] as const

export function HomeShowcase() {
  const tiles = TILES.flatMap((tile) => {
    const item = getItem("components", tile.name)
    return item ? [{ ...tile, title: item.title, description: item.description }] : []
  })

  return (
    <section aria-labelledby="showcase" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Live, not screenshots</p>
            <h2 id="showcase" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Try them right here
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Drag the globe, slide the comparison, hover the dock. Every tile is the real component.
            </p>
          </div>
          <Link
            href="/components"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            All components <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <article key={tile.name} className={cn("flex flex-col overflow-hidden rounded-xl border bg-card", "className" in tile ? tile.className : undefined)}>
              <ComponentPreview name={tile.name} className={cn("min-h-56 flex-1 border-b", tile.preview)} />
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <h3 className="min-w-0 text-sm font-medium">
                  <Link href={`/components/${tile.name}`} className="hover:underline hover:underline-offset-4">
                    {tile.title}
                  </Link>
                </h3>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
