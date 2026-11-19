import type { Metadata } from "next"
import { Suspense } from "react"

import { IconExplorer, IconExplorerFromUrl } from "@/components/site/icon-explorer"
import { ICON_VARIANTS } from "@/lib/icon-export"
import { icons } from "@/lib/icons"

export const metadata: Metadata = {
  title: "Icons",
  description: `${icons.length} original VenusUI icons in outline, solid, duotone, colour, 3D and animated styles. Copy SVG or JSX, or download SVG, PNG, JPEG, WebP, ICO or PDF. Free under the MIT license.`,
}

export default function IconsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Icons</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Drawn by hand for VenusUI on a 24-pixel grid. Free for any project under the MIT license.
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {icons.length} icons · {ICON_VARIANTS.length} styles · svg png jpeg webp ico pdf
        </p>
      </header>
      <Suspense fallback={<IconExplorer icons={icons} />}>
        <IconExplorerFromUrl icons={icons} />
      </Suspense>
    </div>
  )
}
