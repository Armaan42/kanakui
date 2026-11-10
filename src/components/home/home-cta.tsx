import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BeamRain } from "@/components/home/beam-rain"
import { GitHubIcon } from "@/components/site/icons"
import { siteConfig } from "@/config/site"

/** The closing call to action, on a dark stage with falling beams in both themes. */
export function HomeCta() {
  return (
    <section aria-labelledby="cta">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="dark relative isolate overflow-hidden rounded-3xl border bg-background px-6 pt-20 pb-24 text-center text-foreground sm:pt-28 sm:pb-32">
          <BeamRain />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta" className="text-4xl font-semibold tracking-tighter text-balance sm:text-6xl">
              Start building something people remember
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground">
              Free, open source and yours to change. Your next component is one command away.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/components"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-7 text-sm font-medium text-background transition-colors outline-none hover:bg-foreground/90 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Browse components
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-medium backdrop-blur-md transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <GitHubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
