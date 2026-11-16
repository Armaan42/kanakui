import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BeamRain } from "@/components/home/beam-rain"
import { GitHubIcon } from "@/components/site/icons"
import { siteConfig } from "@/config/site"

/** The closing call to action, with falling beams. Follows the site theme. */
export function HomeCta() {
  return (
    <section aria-labelledby="cta">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-linear-to-b from-violet-50/70 to-background px-6 dark:from-background pt-20 pb-24 text-center text-foreground sm:pt-28 sm:pb-32">
          <BeamRain />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta" className="text-4xl font-semibold tracking-tighter text-balance sm:text-6xl">
              Start building something people remember
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground">
              Everything you need to create beautiful, modern interfaces: free, open source and yours to change.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/components"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-7 text-sm font-medium text-background transition-colors outline-none hover:bg-foreground/90 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Explore components
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-background/60 px-7 text-sm font-medium backdrop-blur-md transition-colors outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Read the docs
              </Link>
            </div>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <GitHubIcon className="size-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
