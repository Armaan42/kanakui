import type { Metadata } from "next"
import { Suspense } from "react"

import { IconExplorer, IconExplorerFromUrl } from "@/components/site/icon-explorer"
import { icons } from "@/lib/icons"

export const metadata: Metadata = {
  title: "Icons",
  description: `${icons.length} original VenusUI icons in outline, solid, duotone, colour, 3D and animated styles. Pick a colour, size and stroke, then copy SVG or JSX, or download SVG, PNG, JPEG, WebP, ICO or PDF. Free under the MIT license.`,
}

export default function IconsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Icons</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">VenusUI Icons</h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          {icons.length} original icons in outline, solid, duotone, colour, 3D and animated styles, drawn on a 24-pixel grid. Pick a style, colour, size
          and stroke, then copy the code or download SVG, PNG, JPEG, WebP, ICO or PDF. Free for personal and commercial
          use under the MIT license.
        </p>
      </div>
      <Suspense fallback={<IconExplorer icons={icons} />}>
        <IconExplorerFromUrl icons={icons} />
      </Suspense>
    </div>
  )
}
