import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HomeCategories } from "@/components/home/home-categories"
import { HomeCta } from "@/components/home/home-cta"
import { HomeFaq } from "@/components/home/home-faq"
import { HomeHero } from "@/components/home/home-hero"
import { HomeHowItWorks } from "@/components/home/home-how-it-works"
import { HomeShowcase } from "@/components/home/home-showcase"
import { BlockGrid } from "@/components/site/block-card"
import { getFeatured, getItems, getItemsByCategory } from "@/lib/registry"

export default function HomePage() {
  const components = getItems("components").length
  const blocks = getItems("blocks")
  const threeD = getItemsByCategory("components", "3d").length
  const featuredBlocks = getFeatured("blocks").slice(0, 4)

  return (
    <>
      <HomeHero components={components} blocks={blocks.length} threeD={threeD} />
      <HomeShowcase />
      <HomeCategories />
      <HomeHowItWorks />

      {featuredBlocks.length > 0 ? (
        <section aria-labelledby="blocks" className="border-b">
          <div className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {blocks.length} blocks
                </p>
                <h2 id="blocks" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Whole sections, ready to drop in
                </h2>
                <p className="mt-3 text-pretty text-muted-foreground">
                  Heroes, pricing tables, testimonials and footers, built from the same components.
                </p>
              </div>
              <Link
                href="/blocks"
                className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                All blocks <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <BlockGrid blocks={featuredBlocks} />
          </div>
        </section>
      ) : null}

      <HomeFaq />
      <HomeCta />
    </>
  )
}
