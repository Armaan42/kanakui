import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlockWall, type BlockWallTile } from "@/components/home/block-wall"
import { blockThumbnails } from "@/config/block-thumbnails"
import { getItems } from "@/lib/registry"

/** Shown first, in this order; the rest of the wall is filled from the other blocks. */
const PREFERRED = [
  "hero-08", "pricing-01", "features-05", "testimonials-03", "cta-04",
  "hero-07", "bento-01", "stats-02", "pricing-02", "footer-03",
  "hero-06", "features-04", "login-01", "changelog-01", "faq-02",
]
const ROWS = 3
const PER_ROW = 5

/** The homepage's block section: a heading and a scrolling wall of block screenshots. */
export function HomeBlocks() {
  const blocks = getItems("blocks")
  const withThumbnails = new Set(blockThumbnails)
  const byName = new Map(blocks.filter((b) => withThumbnails.has(b.name)).map((b) => [b.name, b]))
  const ordered = [
    ...PREFERRED.flatMap((name) => byName.get(name) ?? []),
    ...[...byName.values()].filter((b) => !PREFERRED.includes(b.name)),
  ]
  const tiles: BlockWallTile[] = ordered
    .slice(0, ROWS * PER_ROW)
    .map((b) => ({ name: b.name, title: b.title, href: b.href }))
  const rows = Array.from({ length: ROWS }, (_, i) => tiles.slice(i * PER_ROW, (i + 1) * PER_ROW)).filter(
    (row) => row.length > 0
  )

  if (rows.length === 0) return null

  return (
    <section aria-labelledby="blocks" className="overflow-hidden border-b">
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{blocks.length} blocks</p>
            <h2 id="blocks" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Whole sections, ready to drop in
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Heroes, pricing tables, testimonials and footers, built from the same components. Scroll to see them
              all line up.
            </p>
          </div>
          <Link
            href="/blocks"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            All blocks <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
      <BlockWall rows={rows} />
    </section>
  )
}
