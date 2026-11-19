import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { IconShowcase } from "@/components/home/icon-showcase"
import { ICON_VARIANTS } from "@/lib/icon-export"
import { icons } from "@/lib/icons"

/** A spread across every category, shown on the homepage. */
const PICKS = [
  "heart", "bell", "camera", "rocket", "code", "terminal", "git-branch", "database",
  "sun", "moon", "lightning", "cloud", "map-pin", "plane", "compass", "ticket",
  "wallet", "coins", "trend-up", "pie-chart", "thumbs-up", "comment", "users", "award",
  "heart-pulse", "pill", "cart", "gift", "lock", "key", "music", "sparkle",
]

/** The Icons section: what the set is, and 32 of them to try in every style. */
export function HomeIcons() {
  const picks = PICKS.flatMap((name) => icons.filter((icon) => icon.name === name))

  return (
    <section aria-labelledby="icons" className="border-b">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-x-14 gap-y-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div>
          <h2 id="icons" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Icons, drawn by hand
          </h2>
          <p className="mt-4 leading-7 text-pretty text-muted-foreground">
            {icons.length} original icons in {ICON_VARIANTS.length} styles, from a plain outline to glossy 3D and icons
            that move. Free like everything else: copy the SVG or React code, or download PNG, PDF and more.
          </p>
          <Link
            href="/icons"
            className="mt-7 inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Browse all {icons.length} icons
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <IconShowcase icons={picks} />
      </div>
    </section>
  )
}
