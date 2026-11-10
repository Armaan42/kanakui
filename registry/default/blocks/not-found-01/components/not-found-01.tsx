import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { GridPattern } from "@/registry/default/ui/grid-pattern"
import { Text3d } from "@/registry/default/ui/text-3d"

/**
 * A 404 page body with an extruded "404", a short message and a link home.
 * Built for Next.js: render it from `app/not-found.tsx`. In other React
 * frameworks, replace `Link` with your router's link or a plain `<a>`.
 */
export function NotFound01() {
  return (
    <section className="relative flex min-h-[36rem] items-center justify-center overflow-hidden bg-background px-4 py-20 text-center">
      <GridPattern fade className="text-foreground/[0.06]" />
      <div className="relative">
        <Text3d text="404" as="p" depth={10} className="text-8xl sm:text-9xl" />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-5 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
      </div>
    </section>
  )
}
