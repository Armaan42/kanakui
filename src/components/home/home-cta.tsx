import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { GitHubIcon } from "@/components/site/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Meteors } from "@/registry/default/ui/meteors"

export function HomeCta() {
  return (
    <section aria-labelledby="cta">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center sm:py-20">
          <Meteors count={18} />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta" className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Start building something people remember
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Free, open source and yours to change. Your next component is one command away.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-6">
                <Link href="/components">
                  Browse components
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6">
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  <GitHubIcon data-icon="inline-start" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
