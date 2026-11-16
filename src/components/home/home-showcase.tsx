import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { ComponentPreview } from "@/components/site/component-preview"
import { getCategoryTitle, getItem } from "@/lib/registry"
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
    return item
      ? [{ ...tile, title: item.title, description: item.description, category: getCategoryTitle(item.categories[0] ?? "") }]
      : []
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
            Explore all components <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <article key={tile.name} className={cn("flex flex-col overflow-hidden rounded-xl border bg-card", "className" in tile ? tile.className : undefined)}>
              <ComponentPreview name={tile.name} className={cn("min-h-56 flex-1 border-b", tile.preview)} />
              {/* The whole footer is the link (the preview above stays interactive). */}
              <div className="group/tile relative flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/40">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-medium">
                      <Link
                        href={`/components/${tile.name}`}
                        className="outline-none after:absolute after:inset-0 after:rounded-b-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
                      >
                        {tile.title}
                      </Link>
                    </h3>
                    <span className="shrink-0 rounded-full border px-2 py-px text-[11px] text-muted-foreground">{tile.category}</span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{tile.description}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 group-hover/tile:text-foreground"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
